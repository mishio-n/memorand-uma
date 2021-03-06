import { Betting, Horse, User, BetType, MarkCardType } from '@prisma/client'

export type BettingInfo = {
  id: number
  user: string
  userId: string
  courseId: string
  date: string
  race: number
  betType: BetType
  markCardtype: MarkCardType
  horses: BettingHorse[]
  comment: string
}

export type Column = 1 | 2 | 3

export type BettingHorse = {
  number: number
  column: Column
}

export type BettingForm = {
  race: number
  comment: string
  horses: BettingHorse[]
  confidence: number
  betType: BetType
  markCardtype: MarkCardType
}

export type BettingData = Betting & {
  user: User
  column1: number[]
  column2: number[]
  column3: number[]
}

export type BettingResponse = Betting & {
  user: User
  horse: Horse[]
}

export type MarkCard = {
  type: MarkCardType
  column1: number[]
  column2: number[]
  column3: number[]
}
