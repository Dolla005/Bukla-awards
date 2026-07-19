import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized. Please log in to buy votes.' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { amount } = body;

    if (!amount || typeof amount !== 'number' || amount < 10) {
      return NextResponse.json({ error: 'Minimum purchase is 10 votes.' }, { status: 400 });
    }

    // Cost calculation (for reference/future integration)
    const cost = amount * 25; // Ksh 25 per vote

    // In a real application, here is where you would initiate the M-Pesa STK push
    // and wait for the callback. For this implementation, we will simulate immediate success.

    // Update user's vote balance
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        voteBalance: {
          increment: amount
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Successfully purchased ${amount} votes for Ksh ${cost}.`,
      newBalance: updatedUser.voteBalance 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Buy votes error:', error);
    return NextResponse.json({ error: 'Internal server error while buying votes.' }, { status: 500 });
  }
}
