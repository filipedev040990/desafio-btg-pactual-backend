import { OrderRepositoryData } from '../repositories/order.repository.interface'

export interface GetByClientInterface {
  execute: (clientId: string) => Promise<OrderRepositoryData []>
}
