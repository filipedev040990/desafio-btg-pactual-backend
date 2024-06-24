import { CreateOrderUseCase } from '@/application/usecases/create-order/create-order.usecase'
import { RabbitmqAdapter } from '@/infra/adapters/rabbitmq.adapter'
import { OrderRepository } from '@/infra/database/repositories/order.repository'
import { ConsumeCreatedOrderQueue } from '@/infra/tasks/consume-created-order-queue.task'
import constants from '@/shared/constants'

export const makeConsumeCreatedOrderQueueFactory = (): ConsumeCreatedOrderQueue => {
  const queue = new RabbitmqAdapter(constants.RABBIT_MQ_URI)
  const repository = new OrderRepository()
  const usecase = new CreateOrderUseCase(repository)
  return new ConsumeCreatedOrderQueue(queue, usecase)
}
