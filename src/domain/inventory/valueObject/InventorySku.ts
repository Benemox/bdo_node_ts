export class InventorySku {
  constructor(public readonly value: string) {
    if (!value || value.trim() === '') {
      throw new Error('SKU cannot be empty');
    }
  }
}
