export interface GetOrderTotalValueUseCaseInterface {
  execute: (identifier: string) => Promise<{totalValue: number}>
}
