export class InventoryQuantity {
  constructor(public readonly value: number) {
    if (value < 0) {
      throw new Error('Quantity cannot be negative');
    }
  }
}
