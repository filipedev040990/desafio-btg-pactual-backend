import { Router } from 'express'
import { expressRouteAdapter } from './adapters/express.adapter'
import { makeGetOrderTotalValueControlerFactory } from './factories/controllers/get-order-total-value-controller.factory'

const router = Router()

router.get('/order/:identifier/totalValue', expressRouteAdapter(makeGetOrderTotalValueControlerFactory()))

export { router }
