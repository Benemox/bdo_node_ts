import { Inventory } from '@/domain/inventory/aggregate/Inventory';

export interface InventoryRepository {
  findAll(): Promise<Inventory[]>;
  findBySku(sku: string): Promise<Inventory | null>;
  save(inventory: Inventory): Promise<void>;
}
