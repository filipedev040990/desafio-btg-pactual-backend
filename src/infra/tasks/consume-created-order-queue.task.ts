import constants from '@/shared/constants'
import { QueueInterface } from '@/domain/interfaces/adapters/queue.adapter.interface'
import { CreateOrderUseCaseInterface } from '@/domain/interfaces/usecases/create-order.usecase.interface'
import { logger } from '@/shared/helpers/logger.helper'

export class ConsumeCreatedOrderQueue {
  constructor (
    private readonly queue: QueueInterface,
    private readonly createOrderUseCase: CreateOrderUseCaseInterface
  ) {}

  public async execute (): Promise<void> {
    await this.queue.start()
    await this.queue.consume(constants.CREATED_ORDER_QUEUE, async (message: any) => {
      const parsedMessage = JSON.parse(message.content.toString())
      logger.info(`Received message: ${JSON.stringify(parsedMessage)}`)
      await this.createOrderUseCase.execute(parsedMessage)
    })
  }
}
