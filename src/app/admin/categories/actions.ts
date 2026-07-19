'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const orderIndexStr = formData.get('orderIndex') as string;
  const orderIndex = orderIndexStr ? parseInt(orderIndexStr, 10) : 999;
  
  await prisma.category.create({
    data: { name, orderIndex, active: true },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/categories');
  revalidatePath('/nominate');
}

export async function updateCategory(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const orderIndexStr = formData.get('orderIndex') as string;
  const activeStr = formData.get('active') as string;
  
  const orderIndex = orderIndexStr ? parseInt(orderIndexStr, 10) : 999;
  const active = activeStr === 'on';

  await prisma.category.update({
    where: { id },
    data: { name, orderIndex, active },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/categories');
  revalidatePath('/nominate');
}
