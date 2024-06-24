import { CountByClientUseCase } from '@/application/usecases/count-by-client/count-by-client.usecase'
import { OrderRepository } from '@/infra/database/repositories/order.repository'

export const makeCountByClientUseCaseFactory = (): CountByClientUseCase => {
  const repository = new OrderRepository()
  return new CountByClientUseCase(repository)
}
