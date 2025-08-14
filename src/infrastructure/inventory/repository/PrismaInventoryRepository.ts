import { PrismaClient } from '@prisma/client';
import { Inventory } from '@/domain/inventory/aggregate/Inventory.js';
import { InventoryRepository } from '@/domain/inventory/repository/InventoryRepository.js';

export class PrismaInventoryRepository implements InventoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Inventory[]> {
    const records = await this.prisma.inventory.findMany();

    return records.map((record) =>
      Inventory.fromData({
        sku: record.sku,
        quantity: record.quantity,
        location: record.location,
        lastUpdated: record.lastUpdated,
      })
    );
  }

  async findBySku(sku: string): Promise<Inventory | null> {
    const record = await this.prisma.inventory.findUnique({
      where: { sku },
    });

    if (!record) return null;

    return Inventory.fromData({
      sku: record.sku,
      quantity: record.quantity,
      location: record.location,
      lastUpdated: record.lastUpdated,
    });
  }

  async save(inventory: Inventory): Promise<void> {
    await this.prisma.inventory.upsert({
      where: { sku: inventory.getSku() },
      update: {
        quantity: inventory.getQuantity(),
        location: inventory.getLocation(),
        lastUpdated: inventory.getLastUpdated(),
      },
      create: {
        sku: inventory.getSku(),
        quantity: inventory.getQuantity(),
        location: inventory.getLocation(),
        lastUpdated: inventory.getLastUpdated(),
      },
    });
  }
}
