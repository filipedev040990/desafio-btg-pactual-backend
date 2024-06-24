import { GetOrderTotalValueUseCase } from '@/application/usecases/get-order-total-value/get-order-total-value.usecase'
import { OrderRepository } from '@/infra/database/repositories/order.repository'

export const makeGetOrderTotalValueUseCaseFactory = (): GetOrderTotalValueUseCase => {
  const repository = new OrderRepository()
  return new GetOrderTotalValueUseCase(repository)
}
