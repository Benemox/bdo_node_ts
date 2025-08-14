import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaInventoryRepository } from '@/infrastructure/inventory/repository/PrismaInventoryRepository';
import { FindAllInventoryHandler } from '@/application/inventory/query/FindAllInventory/FindAllInventoryHandler';

export class FindAllInventoryController {
  static async handle(req: Request, res: Response): Promise<void> {
    const prisma = new PrismaClient();
    const repository = new PrismaInventoryRepository(prisma);
    const handler = new FindAllInventoryHandler(repository);

    try {
      const inventories = await handler.execute();
      res.json(inventories.map(inv => inv.serialize()));
    } catch (error) {
      console.error('FindAllInventory error:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  }
}
