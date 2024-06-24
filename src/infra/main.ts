import 'module-alias/register'
import express from 'express'
import cors from 'cors'
import { makeConsumeCreatedOrderQueueFactory } from './factories/tasks/consume-created-order-queue.factory'
import { logger } from '@/shared/helpers/logger.helper'
import { router } from './route'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '@/infra/swagger.json'

const start = async (): Promise<void> => {
  try {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use('/v1', router)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    const port = process.env.PORT ?? 3000

    app.listen(port, async () => {
      logger.info(`Server running at port ${port}`)

      await makeConsumeCreatedOrderQueueFactory().execute()
    })
  } catch (error) {
    logger.error(error)
  }
}

void start()
