import { OrderRepositoryData, OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'
import { connection } from '../prisma-connection'

export class OrderRepository implements OrderRepositoryInterface {
  async create (data: OrderRepositoryData): Promise<void> {
    await connection.order.create({ data })
  }

  async getByIdentifier (identifier: string): Promise<OrderRepositoryData | null> {
    const order = await connection.order.findFirst({ where: { identifier } })
    return order ?? null
  }

  async getByClientId (clientId: string): Promise<OrderRepositoryData[]> {
    return await connection.order.findMany({ where: { clientId } })
  }
}
