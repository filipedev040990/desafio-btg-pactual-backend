import { ClientEntity } from './client.entity'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import MockDate from 'mockdate'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('AnyId')
}))

describe('ClientEntity', () => {
  let sut: any
  let input: any

  beforeEach(() => {
    sut = ClientEntity
    input = {
      name: 'anyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      phoneNumber: 'anyPhoneNumber'
    }
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throw if name is not provided', () => {
    input.name = null
    expect(() => sut.build(input)).toThrowError(new MissingParamError('name'))
  })

  test('should throw if a email invalid is provided', () => {
    input.email = null
    expect(() => sut.build(input)).toThrowError(new InvalidParamError('email'))
  })

  test('should throw if document is not provided', () => {
    input.document = null
    expect(() => sut.build(input)).toThrowError(new MissingParamError('document'))
  })

  test('should throw if phoneNumber is not provided', () => {
    input.phoneNumber = null
    expect(() => sut.build(input)).toThrowError(new MissingParamError('phoneNumber'))
  })

  test('should make a correct Client Entity', () => {
    const client = sut.build(input)
    expect(client).toEqual({
      id: 'AnyId',
      name: 'anyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      phoneNumber: 'anyPhoneNumber',
      createdAt: new Date()
    })
  })
})
