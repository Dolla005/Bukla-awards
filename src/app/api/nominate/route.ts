import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { nomineeName, categoryId, instagram, reason, submitterName, submitterPhone } = await req.json();

    if (!nomineeName || !categoryId) {
      return NextResponse.json({ error: 'Nominee Name and Category are required' }, { status: 400 });
    }

    // @ts-ignore
    const submission = await prisma.nominationSubmission.create({
      data: {
        nomineeName,
        categoryId,
        instagram,
        reason,
        submitterName,
        submitterPhone,
      }
    });

    return NextResponse.json({ success: true, submission }, { status: 201 });
  } catch (error) {
    console.error('Nomination error:', error);
    return NextResponse.json({ error: 'Failed to submit nomination' }, { status: 500 });
  }
}
