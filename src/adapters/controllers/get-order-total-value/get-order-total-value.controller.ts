import { ControllerInterface } from '@/domain/controllers'
import { GetOrderTotalValueUseCaseInterface } from '@/domain/interfaces/usecases/get-order-total-value.usecase.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'
import { logger } from '@/shared/helpers/logger.helper'
import { HttpRequest, HttpResponse } from '@/shared/types'

export class GetOrderTotalValueController implements ControllerInterface {
  constructor (private readonly usecase: GetOrderTotalValueUseCaseInterface) {}
  async execute (input?: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute(input?.params?.identifier)
      return success(200, output)
    } catch (error) {
      logger.error(error)
      return handleError(error)
    }
  }
}
