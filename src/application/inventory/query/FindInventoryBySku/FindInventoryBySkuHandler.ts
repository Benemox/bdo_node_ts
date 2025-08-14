import { InventoryRepository } from '@/domain/inventory/repository/InventoryRepository';
import { Inventory } from '@/domain/inventory/aggregate/Inventory.js';

export class FindInventoryBySkuHandler {
  constructor(private readonly repository: InventoryRepository) {}

  async execute(sku: string): Promise<Inventory | null> {
    return await this.repository.findBySku(sku);
  }
}
