import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized. Please log in to vote.' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Rate limit: max 20 votes per minute per user
    const { allowed } = rateLimit(userId, 20, 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down and try again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { categoryId, nomineeId } = body;

    if (!categoryId || !nomineeId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the user has already voted in this category
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_categoryId: {
          userId: userId,
          categoryId: categoryId,
        }
      }
    });

    if (existingVote) {
      return NextResponse.json({ error: 'You have already voted in this category.' }, { status: 403 });
    }

    // Create the vote
    const vote = await prisma.vote.create({
      data: {
        userId: userId,
        categoryId: categoryId,
        nomineeId: nomineeId,
      }
    });

    return NextResponse.json({ success: true, vote }, { status: 201 });
  } catch (error: any) {
    console.error('Voting error:', error);
    return NextResponse.json({ error: 'Internal server error during voting.' }, { status: 500 });
  }
}
