import { OrderRepositoryData, OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'
import { connection } from '../prisma-connection'

export class OrderRepository implements OrderRepositoryInterface {
  async create (data: OrderRepositoryData): Promise<void> {
    await connection.order.create({ data })
  }
}
