import { HttpRequest } from '@/shared/types'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { logger } from '@/shared/helpers/logger.helper'
import { GetByClientController } from './get-by-client.controller'
import { mock } from 'jest-mock-extended'
import { GetByClientUseCaseInterface } from '@/domain/interfaces/usecases/get-by-client.interface'

const usecase = mock<GetByClientUseCaseInterface>()
const fakeOrders = [{
  id: 'AnyId',
  identifier: 'anyIdentifier',
  clientId: 'anyClientId',
  totalValue: 20000,
  createdAt: new Date()
}, {
  id: 'AnotherId',
  identifier: 'anotherIdentifier',
  clientId: 'anyClientId',
  totalValue: 50000,
  createdAt: new Date()
}]

describe('GetByClientController', () => {
  let sut: GetByClientController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetByClientController(usecase)
    input = {
      params: {
        clientId: 'anyClientId'
      }
    }
    usecase.execute.mockResolvedValue(fakeOrders)
  })

  beforeAll(() => {
    jest.spyOn(logger, 'info').mockImplementation(() => {})
    jest.spyOn(logger, 'error').mockImplementation(() => {})
  })
  test('should call GetByClientUseCase once and with correct clientId', async () => {
    await sut.execute(input)
    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith('anyClientId')
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: fakeOrders })
  })
  test('should return a correct error if GetByClientUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    usecase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
