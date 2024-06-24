import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { GetOrderTotalValue } from './get-order-total-value.usecase'
import { mock } from 'jest-mock-extended'
import { OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'

const orderRepository = mock<OrderRepositoryInterface>()
const fakeOrder = {
  id: 'AnyId',
  identifier: 'anyIdentifier',
  clientId: 'anyClientId',
  totalValue: 20000,
  createdAt: new Date()
}

describe('GetOrderTotalValue', () => {
  let sut: GetOrderTotalValue
  let identifier: any

  beforeEach(() => {
    sut = new GetOrderTotalValue(orderRepository)
    identifier = 'anyIdentifier'
    orderRepository.getByIdentifier.mockResolvedValue(fakeOrder)
  })

  test('should throw if identifier is not provided', async () => {
    identifier = null
    const promise = sut.execute(identifier)
    await expect(promise).rejects.toThrowError(new MissingParamError('identifier'))
  })

  test('should call OrderRepository.getByIdentifier once and with correct identifier', async () => {
    await sut.execute(identifier)
    expect(orderRepository.getByIdentifier).toHaveBeenCalledTimes(1)
    expect(orderRepository.getByIdentifier).toHaveBeenCalledWith('anyIdentifier')
  })

  test('should throw if OrderRepository.getByIdentifier returns null', async () => {
    orderRepository.getByIdentifier.mockResolvedValueOnce(null)
    const promise = sut.execute(identifier)
    await expect(promise).rejects.toThrowError(new InvalidParamError('identifier'))
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(identifier)
    expect(output).toEqual({ totalValue: 20000 })
  })
})
