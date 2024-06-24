import { HttpRequest } from '@/shared/types'
import { GetOrderTotalValueController } from './get-order-total-value.controller'
import { GetOrderTotalValueUseCaseInterface } from '@/domain/interfaces/usecases/get-order-total-value.usecase.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { logger } from '@/shared/helpers/logger.helper'
import { mock } from 'jest-mock-extended'

const usecase = mock<GetOrderTotalValueUseCaseInterface>()

describe('GetOrderTotalValueController', () => {
  let sut: GetOrderTotalValueController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetOrderTotalValueController(usecase)
    input = {
      params: {
        identifier: 'anyIdentifier'
      }
    }
    usecase.execute.mockResolvedValue({ totalValue: 2000 })
  })

  beforeAll(() => {
    jest.spyOn(logger, 'info').mockImplementation(() => {})
    jest.spyOn(logger, 'error').mockImplementation(() => {})
  })
  test('should call GetOrderTotalValueUseCase once and with correct identifier', async () => {
    await sut.execute(input)
    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith('anyIdentifier')
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: { totalValue: 2000 } })
  })
  test('should return a correct error if GetOrderTotalValueUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    usecase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
