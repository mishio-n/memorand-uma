import { BettingData, BettingForm } from '$/types'
import { Betting } from '@prisma/client'

export type Methods = {
  get: {
    query: {
      date: string
    }
    resBody: BettingData[]
  }
  post: {
    query: {
      date: string
      courseId: string
      accessToken: string
    }
    reqBody: BettingForm
    resBody: Betting
  }
}
