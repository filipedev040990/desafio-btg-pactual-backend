import { CountByClientController } from '@/adapters/controllers/count-by-client/count-by-client.controller'
import { makeCountByClientUseCaseFactory } from '../usecases/count-by-client-usecase.factory'

export const makeCountByClientControllerFactory = (): CountByClientController => {
  const usecase = makeCountByClientUseCaseFactory()
  return new CountByClientController(usecase)
}
