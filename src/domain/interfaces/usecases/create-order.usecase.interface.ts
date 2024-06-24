export interface CreateOrderUseCaseInterface {
  execute: (input: { clientId: string, totalValue: number}) => Promise<{ identifier: string}>
}
