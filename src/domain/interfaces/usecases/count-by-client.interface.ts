export interface CountByClientInterface {
  execute: (clientId: string) => Promise<number>
}
