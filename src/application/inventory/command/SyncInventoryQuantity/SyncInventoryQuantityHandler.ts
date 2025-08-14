import { InventoryRepository } from '@/domain/inventory/repository/InventoryRepository';
import { InventoryQuantityUpdater } from '@/application/inventory/service/InventoryQuantityUpdater';

interface SyncInventoryQuantityRequest {
  sku: string;
  location: string;
  quantity: number;
  updatedAt: string;
}

export class SyncInventoryQuantityHandler {
  constructor(
    private readonly repository: InventoryRepository,
    private readonly updater: InventoryQuantityUpdater
  ) {}

  async execute(data: SyncInventoryQuantityRequest): Promise<void> {
    await await this.updater.execute(data.sku, data.quantity);

  }
}
