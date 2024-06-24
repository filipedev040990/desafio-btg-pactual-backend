import { GetByClientUseCase } from '@/application/usecases/get-by-client/get-by-client.usecase'
import { OrderRepository } from '@/infra/database/repositories/order.repository'

export const makeGetByClientUseCaseFactory = (): GetByClientUseCase => {
  const repository = new OrderRepository()
  return new GetByClientUseCase(repository)
}
