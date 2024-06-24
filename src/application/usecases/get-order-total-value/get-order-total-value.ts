import { OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'

export class GetOrderTotalValue {
  constructor (private readonly orderRepository: OrderRepositoryInterface) {}
  async execute (identifier: string): Promise<{totalValue: number}> {
    if (!isValidString(identifier)) {
      throw new MissingParamError('identifier')
    }

    const order = await this.orderRepository.getByIdentifier(identifier)
    if (!order) {
      throw new InvalidParamError('identifier')
    }
    return { totalValue: order.totalValue }
  }
}
