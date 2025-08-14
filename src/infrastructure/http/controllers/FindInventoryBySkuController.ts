import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { FindInventoryBySkuHandler } from '@/application/inventory/query/FindInventoryBySku/FindInventoryBySkuHandler';
import { PrismaInventoryRepository } from '@/infrastructure/inventory/repository/PrismaInventoryRepository';

export class FindInventoryBySkuController {
  static async handle(req: Request, res: Response): Promise<void> {
    const { sku } = req.params;

    const prisma = new PrismaClient();
    const repository = new PrismaInventoryRepository(prisma);
    const handler = new FindInventoryBySkuHandler(repository);

    try {
      const inventory = await handler.execute(sku);

      if (!inventory) {
        res.status(404).json({ error: 'Inventory not found' });
        return;
      }

      res.json(inventory.serialize());
    } catch (error) {
      console.error('FindInventoryBySku error:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  }
}
