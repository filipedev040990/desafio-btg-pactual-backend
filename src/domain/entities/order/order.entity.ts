import { MissingParamError } from '@/shared/errors'
import { randomUUID } from 'crypto'

export type CreateOrderInput = {
  clientId: string
  totalValue: number
}

export class OrderEntity {
  constructor (
    public readonly id: string,
    public readonly identifier: string,
    public readonly clientId: string,
    public readonly totalValue: number,
    public readonly createdAt: Date
  ) {}

  public static build (input: CreateOrderInput): OrderEntity {
    this.validate(input)
    return this.create(input)
  }

  private static validate (input: CreateOrderInput): void {
    if (!input?.clientId) {
      throw new MissingParamError('clientId')
    }

    if (!input?.totalValue || input?.totalValue < 0) {
      throw new MissingParamError('totalValue')
    }
  }

  private static create (input: CreateOrderInput): OrderEntity {
    const { clientId, totalValue } = input
    const id = randomUUID()
    const identifier = this.identifierGenerate()
    const createdAt = new Date()
    return new OrderEntity(id, identifier, clientId, totalValue, createdAt)
  }

  private static identifierGenerate (): string {
    const max: number = 5
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ0123456789'
    let str: string = ''

    for (let i = 0; i <= max; i++) {
      str += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const timeStamp = new Date().getTime()
    return `${str}-${timeStamp}`
  }
}
