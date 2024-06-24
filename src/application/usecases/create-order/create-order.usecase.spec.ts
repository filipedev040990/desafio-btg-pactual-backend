
import { CreateOrderInput, OrderEntity } from '@/domain/entities/order/order.entity'
import { CreateOrderUseCase } from './create-order.usecase'
import { OrderRepositoryInterface } from '@/domain/interfaces/repositories/order.repository.interface'
import { mock } from 'jest-mock-extended'

const orderRepository = mock<OrderRepositoryInterface>()
const fakeOrderEntity = {
  id: 'AnyId',
  identifier: 'anyIdentifier',
  clientId: 'anyClientId',
  totalValue: 20000,
  createdAt: new Date()
}

describe('CreateOrderUseCase', () => {
  let sut: CreateOrderUseCase
  let input: CreateOrderInput

  beforeEach(() => {
    sut = new CreateOrderUseCase(orderRepository)
    input = {
      clientId: 'anyClientId',
      totalValue: 20000
    }
    jest.spyOn(OrderEntity, 'build').mockReturnValue(fakeOrderEntity)
  })

  test('should make a correct Order', async () => {
    const spy = jest.spyOn(OrderEntity, 'build')
    await sut.execute(input)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(input)
  })

  test('should call OrderRepository.create once and with correct values', async () => {
    await sut.execute(input)
    expect(orderRepository.create).toHaveBeenCalledTimes(1)
    expect(orderRepository.create).toHaveBeenCalledWith(fakeOrderEntity)
  })

  test('should return a correct order identifier', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ identifier: 'anyIdentifier' })
  })
})
