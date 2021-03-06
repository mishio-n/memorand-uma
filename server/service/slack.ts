import { BettingHorse } from '$/types'
import { BetType, MarkCardType, PrismaClient } from '@prisma/client'
import { WebClient } from '@slack/web-api'
import { APP_URL, SLACK_CHANNEL, SLACK_TOKEN } from './envValues'
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

const slack = new WebClient(SLACK_TOKEN)
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

const buildBettingFields = (
  horses: BettingHorse[],
  betType: BetType,
  marcCardtype: MarkCardType
): { title: string; value: string; short: boolean } => {
  const title = BET_TYPE_TABLE[betType]
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
        return `流し: ${column1.join(',')} => ${column2.join(',')} ${
          column3.length === 0 ? '' : `=> ${column3.join(',')}`
        }`
      case 'FORMATION':
        return `フォーメーション: ${column1.join(',')} => ${column2.join(
          ','
        )} ${column3.length === 0 ? '' : `=> ${column3.join(',')}`}`
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
            return `${column1[0]} => ${column2[0]}`
          case 'TRIO':
          case 'TRIFECTA':
            return `${column1[0]} => ${column2[0]} => ${column2[0]}`
        }
    }
  })()

  return {
    title,
    value,
    short: true
  }
}

/**
 * 自信度によって通知バーの色を変える
 * @param confidence 自信度
 */
const getAttachmentColor = (confidence: number) => {
  switch (confidence) {
    case 1:
      return undefined
    case 2:
      return '#B2F5EA'
    case 3:
      return '#81E6D9'
    case 4:
      return '#4FD1C5'
    case 5:
      return '#38B2AC'
    case 10:
      return 'good'
    case 20:
      return 'warning'
    case 30:
      return 'danger'
    default:
      return undefined
  }
}

/**
 * 投票内容をslackに通知する
 */
export const notifyNewBetting = async ({
  userId,
  race,
  comment,
  courseId,
  confidence,
  horses,
  betType,
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

  const result = await slack.chat.postMessage({
    channel: SLACK_CHANNEL,
    text: `@channel ${user.name} さんが予想を追加しました\n`,
    link_names: true,
    attachments: [
      {
        color: getAttachmentColor(confidence),
        title: `${course.course} ${race} レース`,
        text: `自信度: ${confidence} ${
          comment === ''
            ? ''
            : `\n -------------------- \n ${comment} \n -------------------- \n`
        }`,
        fields: [buildBettingFields(horses, betType, markCardType)],
        footer: APP_URL
      }
    ]
  })
  console.log(result)
}
