import { GetOrderTotalValueController } from '@/adapters/controllers/get-order-total-value/get-order-total-value.controller'
import { makeGetOrderTotalValueUseCaseFactory } from '../usecases/get-order-total-value-usecase.factory'

export const makeGetOrderTotalValueControlerFactory = (): GetOrderTotalValueController => {
  const usecase = makeGetOrderTotalValueUseCaseFactory()
  return new GetOrderTotalValueController(usecase)
}
