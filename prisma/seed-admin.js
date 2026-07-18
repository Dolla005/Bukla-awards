const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminPhone = '0700000000';
  const adminPassword = 'adminpassword123';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { phone: adminPhone }
  });

  if (existingAdmin) {
    console.log('Admin user already exists!');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      name: 'System Administrator',
      phone: adminPhone,
      email: 'admin@buklaawards.co.ke',
      password: hashedPassword,
      role: 'ADMIN',
    }
  });

  console.log('Successfully created admin user:');
  console.log('Phone:', adminPhone);
  console.log('Password:', adminPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
