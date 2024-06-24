import { GetByClientController } from '@/adapters/controllers/get-by-client/get-by-client.controller'
import { makeGetByClientUseCaseFactory } from '../usecases/get-by-client-usecase.factory'

export const makeGetByClientControllerFactory = (): GetByClientController => {
  const usecase = makeGetByClientUseCaseFactory()
  return new GetByClientController(usecase)
}
