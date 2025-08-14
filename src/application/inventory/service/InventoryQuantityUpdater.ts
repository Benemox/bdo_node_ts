import { InventoryRepository } from '@/domain/inventory/repository/InventoryRepository';
import { Inventory } from '@/domain/inventory/aggregate/Inventory.js';

export class InventoryQuantityUpdater {
  constructor(private readonly repository: InventoryRepository) {}

  async execute(sku: string, quantity: number): Promise<void> {
    const inventory = await this.repository.findBySku(sku);

    if (!inventory) {
      const newInventory = Inventory.fromData({
        sku,
        quantity,
        location: 'default',
      });

      await this.repository.save(newInventory);
      return;
    }

    inventory.updateQuantity(quantity);
    await this.repository.save(inventory);
  }
}
