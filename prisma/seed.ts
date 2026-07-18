import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test Voter',
      password: hashedPassword,
    },
  });

  // Create Categories
  const catDJ = await prisma.category.upsert({
    where: { name: 'Best DJ of the Year' },
    update: {},
    create: { name: 'Best DJ of the Year', description: 'Celebrating the top disk jockey in the country.' },
  });

  const catClub = await prisma.category.upsert({
    where: { name: 'Peoples Club of the Year' },
    update: {},
    create: { name: 'Peoples Club of the Year', description: 'The most loved nightclub by the people.' },
  });

  // Create Nominees
  await prisma.nominee.create({
    data: {
      name: 'DJ Kafi',
      categoryId: catDJ.id,
      verified: true,
      photoUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop'
    }
  });

  await prisma.nominee.create({
    data: {
      name: 'DJ Bash',
      categoryId: catDJ.id,
      verified: true,
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    }
  });

  await prisma.nominee.create({
    data: {
      name: 'Club Signature',
      categoryId: catClub.id,
      isClub: true,
      verified: false,
      photoUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&h=400&fit=crop'
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
