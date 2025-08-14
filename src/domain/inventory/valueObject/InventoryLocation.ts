export class InventoryLocation {
  constructor(public readonly value: string) {
    if (!value || value.trim() === '') {
      throw new Error('Location cannot be empty');
    }
  }
}
