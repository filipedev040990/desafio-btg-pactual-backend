import { mock } from 'jest-mock-extended'
import { CountByClient } from './count-by-client'
import { OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'

const orderRepository = mock<OrderRepositoryInterface>()
const fakeOrder = [{
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
describe('CountByClient', () => {
  let sut: CountByClient
  let clientId: any

  beforeEach(() => {
    sut = new CountByClient(orderRepository)
    clientId = 'anyClientId'
    orderRepository.getByClientId.mockResolvedValue(fakeOrder)
  })

  test('should throw if clienId is not provided', async () => {
    clientId = null
    const promise = sut.execute(clientId)
    await expect(promise).rejects.toThrowError(new InvalidParamError('clientId'))
  })

  test('should call OrderRepository.getByClientId once and with correct clientId', async () => {
    await sut.execute(clientId)
    expect(orderRepository.getByClientId).toHaveBeenCalledTimes(1)
    expect(orderRepository.getByClientId).toHaveBeenCalledWith('anyClientId')
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(clientId)
    expect(output).toBe(2)
  })
})
