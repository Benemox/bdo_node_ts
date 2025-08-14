import { InventorySku } from '@/domain/inventory/valueObject/InventorySku';
import { InventoryQuantity } from '@/domain/inventory/valueObject/InventoryQuantity';
import { InventoryLocation } from '@/domain/inventory/valueObject/InventoryLocation';

export class Inventory {
  constructor(
    private readonly sku: InventorySku,
    private quantity: InventoryQuantity,
    private location: InventoryLocation,
    private lastUpdated: Date = new Date()
  ) {}

  static fromData(data: {
    sku: string;
    quantity: number;
    location: string;
    lastUpdated?: Date;
  }): Inventory {
    return new Inventory(
      new InventorySku(data.sku),
      new InventoryQuantity(data.quantity),
      new InventoryLocation(data.location),
      data.lastUpdated ?? new Date()
    );
  }

  updateQuantity(quantity: number) {
    this.quantity = new InventoryQuantity(quantity);
    this.lastUpdated = new Date();
  }

  getSku(): string {
    return this.sku.value;
  }

  getLocation(): string {
    return this.location.value;
  }

  getQuantity(): number {
    return this.quantity.value;
  }

  getLastUpdated(): Date {
    return this.lastUpdated;
  }

  serialize() {
    return {
      sku: this.sku.value,
      quantity: this.quantity.value,
      location: this.location.value,
      lastUpdated: this.lastUpdated.toISOString(),
    };
  }
}
