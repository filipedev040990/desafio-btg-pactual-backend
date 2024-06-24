export interface CountByClientUseCaseInterface {
  execute: (clientId: string) => Promise<number>
}
