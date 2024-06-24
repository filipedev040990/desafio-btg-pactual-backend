import { Router } from 'express'
import { expressRouteAdapter } from './adapters/express.adapter'
import { makeGetOrderTotalValueControlerFactory } from './factories/controllers/get-order-total-value-controller.factory'
import { makeCountByClientControllerFactory } from './factories/controllers/count-by-client-controller.factory'
import { makeGetByClientControllerFactory } from './factories/controllers/get-by-client-controller.factory'

const router = Router()

router.get('/order/:identifier/totalValue', expressRouteAdapter(makeGetOrderTotalValueControlerFactory()))
router.get('/order/:clientId/totalOrders', expressRouteAdapter(makeCountByClientControllerFactory()))
router.get('/order/:clientId/orders', expressRouteAdapter(makeGetByClientControllerFactory()))

export { router }
