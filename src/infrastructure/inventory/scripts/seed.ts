import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  const inventories = [
    { sku: 'SKU001', quantity: 100, location: 'warehouse-A' },
    { sku: 'SKU002', quantity: 50, location: 'warehouse-B' },
    { sku: 'SKU003', quantity: 200, location: 'warehouse-A' },
  ];

  for (const inv of inventories) {
    await prisma.inventory.upsert({
      where: { sku: inv.sku },
      update: {
        quantity: inv.quantity,
        location: inv.location,
        lastUpdated: new Date(),
      },
      create: {
        sku: inv.sku,
        quantity: inv.quantity,
        location: inv.location,
        lastUpdated: new Date(),
      },
    });
  }

  console.log('✅ Database seeding completed.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
