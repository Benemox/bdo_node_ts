export class SyncInventoryQuantityCommand {
  constructor(
    public readonly sku: string,
    public readonly quantity: number
  ) {}
}
