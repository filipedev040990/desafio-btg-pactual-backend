export interface GetOrderTotalValueInterface {
  execute: (identifier: string) => Promise<{totalValue: number}>
}
