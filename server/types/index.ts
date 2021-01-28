import { Betting, Horse, User } from '@prisma/client'

export type UserInfo = {
  id: number
  name: string
  displayName: string
  icon: string | null
}

export type AuthHeader = {
  authorization: string
}

export type RaceCourse = {
  id: string
  course: string
  active: boolean
  type: 'main' | 'local' | 'nra' | 'overseas'
}

export type BettingInfo = {
  id: number
  user: string
  userId: string
  courseId: string
  date: string
  race: number
  horses: BettingHorse[]
  comment: string
}

export type BettingHorse = {
  number: number
  type: BetType
}

export type BetType = 'WIN' | 'PLACE'

export type RaceBetting = {
  user: UserInfo
  horses: BettingHorse[]
  comment: string
}

export type BettingForm = {
  race: number
  comment: string
  horses: BettingHorse[]
  confidence: number
}

export type BettingData = Betting & {
  user: User
  horse: Horse[]
}
