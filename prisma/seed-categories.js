const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
  "PEOPLES CLUB OF THE YEAR",
  "BEST NIGHTLIFE INFLUENCER",
  "BEST MONDAY NIGHT THEME NIGHT",
  "BEST TUESDAY NIGHT THEME NIGHT",
  "BEST WEDNESDAY NIGHT THEME NIGHT",
  "BEST THURSDAY THEME NIGHT",
  "BEST SUNDAY THEME NIGHT",
  "PEOPLES OUT OF TOWN CLUB OF THE YEAR",
  "BEST CLUB HOSTESSES",
  "BEST CLUB INTERIOR DESIGN",
  "BEST CLUB WITH HOSPITALITY",
  "BEST DJ OF THE YEAR",
  "BEST MCEE OF THE YEAR",
  "BEST MARKETER OF THE YEAR",
  "MOST CONSISTENT CLUB",
  "MOST CONSISTENT DJ AND MCEE",
  "MOST VALUABLE DJ AND MCEE"
];

async function main() {
  console.log('Seeding categories from flyer...');

  for (const catName of categories) {
    const titleCased = catName.split(' ').map(word =>
      word === 'AND' || word === 'OF' || word === 'THE' || word === 'WITH' ? word.toLowerCase() :
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');

    await prisma.category.upsert({
      where: { name: titleCased },
      update: {},
      create: {
        name: titleCased,
        description: `Award for ${titleCased}`
      }
    });
    console.log(`Created: ${titleCased}`);
  }

  console.log('All categories seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
