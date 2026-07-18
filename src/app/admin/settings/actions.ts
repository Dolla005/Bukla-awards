'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateEventDate(formData: FormData) {
  const eventDate = formData.get('eventDate') as string;
  const eventLocation = formData.get('eventLocation') as string;
  const showResults = formData.get('showResults') === 'on' ? 'true' : 'false';
  
  if (eventDate) {
    await prisma.systemSetting.upsert({
      where: { key: 'eventDate' },
      update: { value: eventDate },
      create: { key: 'eventDate', value: eventDate, id: 'eventDate' }
    });
  }

  if (eventLocation) {
    await prisma.systemSetting.upsert({
      where: { key: 'eventLocation' },
      update: { value: eventLocation },
      create: { key: 'eventLocation', value: eventLocation, id: 'eventLocation' }
    });
  }

  await prisma.systemSetting.upsert({
    where: { key: 'showResults' },
    update: { value: showResults },
    create: { key: 'showResults', value: showResults, id: 'showResults' }
  });

  revalidatePath('/');
  revalidatePath('/admin/settings');
  revalidatePath('/results');
}
