import { BettingHorse } from '$/types'

export type Methods = {
  get: {
    query: {
      bettingId: number
    }
    resBody: BettingHorse[]
  }
}
