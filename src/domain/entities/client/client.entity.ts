import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { isValidEmail } from '@/shared/helpers/email.helper'
import { randomUUID } from 'crypto'

export type CreateEntityInput = {
  name: string
  email: string
  document: string
  phoneNumber: string
}

export class ClientEntity {
  constructor (
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly document: string,
    public readonly phoneNumber: string,
    public readonly createdAt: Date
  ) {}

  public static build (input: CreateEntityInput): ClientEntity {
    this.validate(input)
    return this.create(input)
  }

  private static validate (input: CreateEntityInput): void {
    if (!input?.name) {
      throw new MissingParamError('name')
    }

    if (!isValidEmail(input?.email)) {
      throw new InvalidParamError('email')
    }

    if (!input?.document) {
      throw new MissingParamError('document')
    }

    if (!input?.phoneNumber) {
      throw new MissingParamError('phoneNumber')
    }
  }

  private static create (input: CreateEntityInput): ClientEntity {
    const { name, email, document, phoneNumber } = input
    const id = randomUUID()
    const createdAt = new Date()
    return new ClientEntity(id, name, email, document, phoneNumber, createdAt)
  }
}
