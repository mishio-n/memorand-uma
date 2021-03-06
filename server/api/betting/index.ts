import { BettingForm, BettingResponse } from '$/types'
import { Betting } from '@prisma/client'

export type Methods = {
  get: {
    query: {
      date: string
    }
    resBody: BettingResponse[]
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
