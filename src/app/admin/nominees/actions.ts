'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addNominee(formData: FormData) {
  const name = formData.get('name') as string;
  const categoryId = formData.get('categoryId') as string;
  const club = formData.get('club') as string;
  const county = formData.get('county') as string;
  const photoUrl = formData.get('photoUrl') as string;

  if (!name || !categoryId) {
    throw new Error('Name and category are required');
  }

  await prisma.nominee.create({
    data: {
      name,
      categoryId,
      club: club || null,
      county: county || null,
      photoUrl: photoUrl || null,
      verified: true,
    }
  });

  revalidatePath('/admin/nominees');
  revalidatePath('/admin');
  revalidatePath('/nominees');
  revalidatePath('/categories');
}

export async function deleteNominee(nomineeId: string) {
  await prisma.nominee.delete({
    where: { id: nomineeId }
  });

  revalidatePath('/admin/nominees');
  revalidatePath('/admin');
  revalidatePath('/nominees');
  revalidatePath('/categories');
}
