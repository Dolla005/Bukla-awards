'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveNomination(submissionId: string) {
  const submission = await prisma.nominationSubmission.findUnique({
    where: { id: submissionId }
  });

  if (!submission || submission.status !== 'PENDING') {
    throw new Error('Invalid submission');
  }

  // Create the official nominee
  await prisma.nominee.create({
    data: {
      name: submission.nomineeName,
      categoryId: submission.categoryId,
      verified: true, // Approved by admin
    }
  });

  // Update submission status
  await prisma.nominationSubmission.update({
    where: { id: submissionId },
    data: { status: 'APPROVED' }
  });

  revalidatePath('/admin/nominations');
  revalidatePath('/admin/nominees');
  revalidatePath('/admin');
}

export async function rejectNomination(submissionId: string) {
  await prisma.nominationSubmission.update({
    where: { id: submissionId },
    data: { status: 'REJECTED' }
  });

  revalidatePath('/admin/nominations');
  revalidatePath('/admin');
}
