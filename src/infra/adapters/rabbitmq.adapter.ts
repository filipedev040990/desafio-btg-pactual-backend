import { QueueInterface } from '@/domain/interfaces/adapters/queue.adapter.interface'
import { Connection, Channel, connect } from 'amqplib'

export class RabbitmqAdapter implements QueueInterface {
  private connection!: Connection
  private channel!: Channel

  constructor (private readonly uri: string) {}

  async start (): Promise<void> {
    this.connection = await connect(this.uri)
    this.channel = await this.connection.createChannel()
  }

  async consume (queue: string, callback: Function): Promise<any> {
    await this.channel.assertQueue(queue, { durable: true })
    await this.channel.consume(queue, async (message: any) => {
      if (message) {
        callback(message)
        this.channel.ack(message)
      }
    })
  }

  async publish (exchange: string, routingKey: string, message: string): Promise<boolean> {
    await this.channel.assertExchange(exchange, 'direct', { durable: true })
    return this.channel.publish(exchange, routingKey, Buffer.from(message), { persistent: true })
  }

  async close (): Promise<void> {
    await this.channel.close()
  }
}
