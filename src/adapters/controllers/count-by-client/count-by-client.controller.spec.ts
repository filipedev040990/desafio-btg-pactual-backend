import { HttpRequest } from '@/shared/types'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { logger } from '@/shared/helpers/logger.helper'
import { CountByClientController } from './count-by-client.controller'
import { mock } from 'jest-mock-extended'
import { CountByClientUseCaseInterface } from '@/domain/interfaces/usecases/count-by-client.interface'

const usecase = mock<CountByClientUseCaseInterface>()

describe('CountByClientController', () => {
  let sut: CountByClientController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CountByClientController(usecase)
    input = {
      params: {
        clientId: 'anyClientId'
      }
    }
    usecase.execute.mockResolvedValue(10)
  })

  beforeAll(() => {
    jest.spyOn(logger, 'info').mockImplementation(() => {})
    jest.spyOn(logger, 'error').mockImplementation(() => {})
  })
  test('should call CountByClientUseCase once and with correct clientId', async () => {
    await sut.execute(input)
    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith('anyClientId')
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: 10 })
  })
  test('should return a correct error if CountByClientUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    usecase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
