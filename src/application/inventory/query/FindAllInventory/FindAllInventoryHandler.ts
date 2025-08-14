import { InventoryRepository } from '@/domain/inventory/repository/InventoryRepository';
import { Inventory } from '@/domain/inventory/aggregate/Inventory.js';

export class FindAllInventoryHandler {
  constructor(private readonly repository: InventoryRepository) {}

  async execute(): Promise<Inventory[]> {
    return await this.repository.findAll();
  }
}
