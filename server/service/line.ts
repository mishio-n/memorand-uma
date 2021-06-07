import { BettingHorse } from '$/types'
import { BetType, MarkCardType, PrismaClient } from '@prisma/client'
import { Client } from '@line/bot-sdk'
import { LINE_ACCESS_TOKEN, LINE_ROOM_ID } from './envValues'
import { getRaceCourses } from './race-corse'

type NotificationParams = {
  userId: number
  race: number
  comment: string
  courseId: string
  confidence: number
  horses: BettingHorse[]
  betType: BetType
  markCardType: MarkCardType
}

const line = new Client({ channelAccessToken: LINE_ACCESS_TOKEN })
const prisma = new PrismaClient()

const BET_TYPE_TABLE: Record<BetType, string> = {
  WIN: '単勝',
  PLACE: '複勝',
  QUINELLA_PLACE: 'ワイド',
  BRACKET_QUINELLA: '枠連',
  QUINELLA: '馬連',
  EXACTA: '馬単',
  TRIO: '3連複',
  TRIFECTA: '3連単'
}

const buildBettingContent = (
  horses: BettingHorse[],
  betType: BetType,
  marcCardtype: MarkCardType
): string => {
  const column1: number[] = []
  const column2: number[] = []
  const column3: number[] = []
  horses.forEach((horse) => {
    switch (horse.column) {
      case 1:
        column1.push(horse.number)
        break
      case 2:
        column2.push(horse.number)
        break
      case 3:
        column3.push(horse.number)
        break
      default:
        break
    }
  })

  const value = (() => {
    switch (marcCardtype) {
      case 'BOX':
        return `ボックス: ${column1.join(',')}`
      case 'WHEEL':
        return `流し: ${column1.join(',')} -> ${column2.join(',')} ${
          column3.length === 0 ? '' : `-> ${column3.join(',')}`
        }`
      case 'FORMATION':
        return `フォーメーション: ${column1.join(',')} -> ${column2.join(
          ','
        )} ${column3.length === 0 ? '' : `-> ${column3.join(',')}`}`
      case 'NORMAL':
        switch (betType) {
          case 'WIN':
            return `${column1[0]}`
          case 'PLACE':
            return `${column1[0]}`
          case 'QUINELLA_PLACE':
          case 'BRACKET_QUINELLA':
          case 'QUINELLA':
          case 'EXACTA':
            return `${column1[0]} -> ${column2[0]}`
          case 'TRIO':
          case 'TRIFECTA':
            return `${column1[0]} -> ${column2[0]} -> ${column2[0]}`
        }
    }
  })()

  return value
}

/**
 * 投票内容をlineに通知する
 */
export const notifyNewBetting = async ({
  userId,
  race,
  comment,
  courseId,
  confidence,
  betType,
  horses,
  markCardType
}: NotificationParams) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return
  }

  const raceCourses = await getRaceCourses()
  const course = raceCourses.find(({ id }) => id === courseId)
  if (!course) {
    return
  }

  const result = await line.pushMessage(LINE_ROOM_ID, {
    type: 'text',
    text: `${user.name} さんが予想を追加しました\n\n${
      course.course
    } ${race} レース\n自信度: ${confidence}\n\n${
      BET_TYPE_TABLE[betType]
    }\n${buildBettingContent(horses, betType, markCardType)}\n\n${comment}`
  })

  console.log(result)
}
