import { ControllerInterface } from '@/domain/controllers'
import { GetByClientUseCaseInterface } from '@/domain/interfaces/usecases/get-by-client.interface'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'
import { logger } from '@/shared/helpers/logger.helper'
import { HttpRequest, HttpResponse } from '@/shared/types'

export class GetByClientController implements ControllerInterface {
  constructor (private readonly usecase: GetByClientUseCaseInterface) {}
  async execute (input?: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute(input?.params?.clientId)
      return success(200, output)
    } catch (error) {
      logger.error(error)
      return handleError(error)
    }
  }
}
