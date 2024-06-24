import { CreateOrderRepositoryInput, OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'
import { connection } from '../prisma-connection'

export class OrderRepository implements OrderRepositoryInterface {
  async create (data: CreateOrderRepositoryInput): Promise<void> {
    await connection.order.create({ data })
  }
}
