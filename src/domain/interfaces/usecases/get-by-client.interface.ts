import { OrderRepositoryData } from '../repositories/order.repository.interface'

export interface GetByClientUseCaseInterface {
  execute: (clientId: string) => Promise<OrderRepositoryData []>
}
