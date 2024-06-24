import { OrderRepositoryData, OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'
import { GetByClientUseCaseInterface } from '@/domain/interfaces/usecases/get-by-client.interface'
import { InvalidParamError } from '@/shared/errors'
import { isValidString } from '@/shared/helpers/string.helper'

export class GetByClientUseCase implements GetByClientUseCaseInterface {
  constructor (private readonly orderRepository: OrderRepositoryInterface) {}
  async execute (clientId: string): Promise<OrderRepositoryData[]> {
    if (!isValidString(clientId)) {
      throw new InvalidParamError('clientId')
    }

    return await this.orderRepository.getByClientId(clientId)
  }
}
