'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createTicketOrder(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const ticketType = formData.get('ticketType') as string;
  const quantity = parseInt(formData.get('quantity') as string, 10);
  
  if (!name || !email || !phone || !ticketType || isNaN(quantity)) {
    throw new Error('All fields are required');
  }
  
  const prices: Record<string, number> = {
    'Regular': 3000,
    'VIP': 10000,
    'VVIP Table': 100000
  };
  
  const price = prices[ticketType];
  if (!price) {
    throw new Error('Invalid ticket type');
  }
  
  const totalAmount = price * quantity;
  
  const order = await prisma.ticketOrder.create({
    data: {
      name,
      email,
      phone,
      ticketType,
      quantity,
      totalAmount,
      status: 'PENDING'
    }
  });
  
  revalidatePath('/admin/tickets');
  
  return order;
}
