import { MissingParamError } from '@/shared/errors'
import { OrderEntity } from './order.entity'
import MockDate from 'mockdate'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('AnyId'),
  randomBytes: jest.fn()
}))

describe('OrderEntity', () => {
  let sut: any
  let input: any

  beforeEach(() => {
    sut = OrderEntity
    input = {
      clientId: 'anyClientId',
      totalValue: 20000
    }
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throw if clientId is not provided', () => {
    input.clientId = null
    expect(() => sut.build(input)).toThrowError(new MissingParamError('clientId'))
  })

  test('should throw if totalValue is not provided', () => {
    input.totalValue = null
    expect(() => sut.build(input)).toThrowError(new MissingParamError('totalValue'))
  })

  test('should throw if a invalid totalValue is not provided', () => {
    input.totalValue = -1
    expect(() => sut.build(input)).toThrowError(new MissingParamError('totalValue'))
  })

  test('should generate a valid order identifier with expected length and format', () => {
    const orderNumber: string = sut.identifierGenerate()

    // Verifica se o número de pedido tem o comprimento esperado
    expect(orderNumber.length).toBeGreaterThan(0)
    expect(orderNumber.length).toBeLessThanOrEqual(20) // comprimento máximo possível do número de pedido (6 caracters alfanumericos + hifen + 13 numeros to timestamp)

    // Verifica se o formato do número de pedido está correto
    const regex: RegExp = /^[A-Z0-9]{6}-\d+$/ // formato esperado: XXXXX-XXXXXXXXXXXX
    expect(regex.test(orderNumber)).toBe(true)
  })

  test('should make a correct Order Entity', () => {
    jest.spyOn(sut, 'identifierGenerate').mockReturnValueOnce('anyOrderNumber')

    const order = sut.build(input)

    expect(order).toEqual({
      id: 'AnyId',
      identifier: 'anyOrderNumber',
      clientId: 'anyClientId',
      totalValue: 20000,
      createdAt: new Date()
    })
  })
})
