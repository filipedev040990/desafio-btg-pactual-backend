import { OrderEntity } from '@/domain/entities/order/order.entity'
import { OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'
import { CreateOrderUseCaseInterface } from '@/domain/interfaces/usecases/create-order.usecase.interface'

export class CreateOrderUseCase implements CreateOrderUseCaseInterface {
  constructor (private readonly orderRepository: OrderRepositoryInterface) {}
  async execute (input: { clientId: string, totalValue: number}): Promise<{ identifier: string}> {
    const order = OrderEntity.build(input)
    await this.orderRepository.create(order)
    return { identifier: order.identifier }
  }
}
