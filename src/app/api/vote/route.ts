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

    // Rate limit: max 20 vote requests per minute per user
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

    // Enforce 1 vote per category
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId,
        categoryId
      }
    });

    if (existingVote) {
      return NextResponse.json({ 
        error: 'You have already voted in this category.'
      }, { status: 403 });
    }

    // Simulate payment processing delay (M-Pesa STK Push mock)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Record the vote
    await prisma.vote.create({
      data: {
        userId,
        categoryId,
        nomineeId
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Payment successful! Your vote has been cast.`,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Voting error:', error);
    return NextResponse.json({ error: 'Internal server error during voting.' }, { status: 500 });
  }
}
