export type CreateOrderRepositoryInput = {
  id: string
  identifier: string
  clientId: string
  totalValue: number
  createdAt: Date
}

export interface OrderRepositoryInterface {
  create: (input: CreateOrderRepositoryInput) => Promise<void>
}
