const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // -----------------------------------------
  // UPDATE THESE VALUES TO YOUR NEW CREDENTIALS
  // -----------------------------------------
  const currentPhone = '0700000000'; // The phone currently in the database

  const newPhone = '0746030111';       // Your new admin phone number
  const newPassword = '12346789'; // Your new admin password
  // -----------------------------------------

  const existingAdmin = await prisma.user.findUnique({
    where: { phone: currentPhone }
  });

  if (!existingAdmin) {
    console.log(`Could not find an admin with the phone number: ${currentPhone}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedAdmin = await prisma.user.update({
    where: { phone: currentPhone },
    data: {
      phone: newPhone,
      password: hashedPassword,
    }
  });

  console.log('✅ Admin credentials updated successfully!');
  console.log('New Phone:', updatedAdmin.phone);
  console.log('New Password:', newPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
