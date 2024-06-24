export type OrderRepositoryData = {
  id: string
  identifier: string
  clientId: string
  totalValue: number
  createdAt: Date
}

export interface OrderRepositoryInterface {
  create: (input: OrderRepositoryData) => Promise<void>
  getByIdentifier: (identifier: string) => Promise <OrderRepositoryData | null>
}
