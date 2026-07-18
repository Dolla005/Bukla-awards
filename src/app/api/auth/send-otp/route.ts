import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'This phone number is already registered' }, { status: 400 });
    }

    // Generate a 4 digit OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes from now

    // Save to DB
    await prisma.otpVerification.create({
      data: {
        phone,
        code: otpCode,
        expiresAt,
      }
    });

    // MOCK SMS SENDING
    console.log(`\n=================================================`);
    console.log(`[MOCK SMS] Sending OTP to ${phone}: ${otpCode}`);
    console.log(`=================================================\n`);

    return NextResponse.json({ success: true, message: 'OTP sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Internal server error while sending OTP' }, { status: 500 });
  }
}
