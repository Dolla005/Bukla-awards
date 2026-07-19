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
    const { categoryId, nomineeId, amount = 1 } = body;

    if (!categoryId || !nomineeId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (amount < 1) {
      return NextResponse.json({ error: 'Amount must be at least 1' }, { status: 400 });
    }

    // Check if user has enough vote balance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { voteBalance: true }
    });

    if (!user || user.voteBalance < amount) {
      return NextResponse.json({ 
        error: 'Insufficient vote balance. Please buy more votes.',
        insufficientBalance: true
      }, { status: 403 });
    }

    // Execute in a transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // 1. Deduct balance
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          voteBalance: {
            decrement: amount
          }
        }
      });

      // 2. Create votes (we use createMany for bulk insertion)
      const voteData = Array.from({ length: amount }).map(() => ({
        userId,
        categoryId,
        nomineeId
      }));

      await tx.vote.createMany({
        data: voteData
      });

      return updatedUser;
    });

    return NextResponse.json({ 
      success: true, 
      message: `Successfully cast ${amount} vote(s)`,
      newBalance: result.voteBalance
    }, { status: 201 });
  } catch (error: any) {
    console.error('Voting error:', error);
    return NextResponse.json({ error: 'Internal server error during voting.' }, { status: 500 });
  }
}
