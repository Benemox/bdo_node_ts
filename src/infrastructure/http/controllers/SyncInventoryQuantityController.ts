import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { SyncInventoryQuantityHandler } from '@/application/inventory/command/SyncInventoryQuantity/SyncInventoryQuantityHandler';
import { PrismaInventoryRepository } from '@/infrastructure/inventory/repository/PrismaInventoryRepository';
import { InventoryQuantityUpdater } from '@/application/inventory/service/InventoryQuantityUpdater';

export class SyncInventoryQuantityController {
  static async handle(req: Request, res: Response): Promise<void> {
    const { sku, quantity } = req.body;

    if (!sku || typeof quantity !== 'number') {
      res.status(400).json({ error: 'Invalid payload. "sku" and "quantity" are required.' });
      return;
    }

    const prisma = new PrismaClient();
    const repository = new PrismaInventoryRepository(prisma);
    const updater = new InventoryQuantityUpdater(repository);
    const handler = new SyncInventoryQuantityHandler(repository, updater);

    try {
      await handler.execute({ sku, quantity, location: 'default', updatedAt: new Date().toISOString() });
      res.status(204).send();
    } catch (error) {
      console.error('SyncInventoryQuantity error:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  }
}
