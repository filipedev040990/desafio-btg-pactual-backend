import { OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'
import { CountByClientUseCaseInterface } from '@/domain/interfaces/usecases/count-by-client.interface'
import { InvalidParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'

export class CountByClientUseCase implements CountByClientUseCaseInterface {
  constructor (private readonly orderRepository: OrderRepositoryInterface) {}
  async execute (clientId: string): Promise<number> {
    if (!isValidString(clientId)) {
      throw new InvalidParamError('clientId')
    }

    const order = await this.orderRepository.getByClientId(clientId)
    return order.length
  }
}
