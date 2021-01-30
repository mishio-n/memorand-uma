import { BettingHorse } from '$/types'
import { BetType, PrismaClient } from '@prisma/client'
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
}

const slack = new WebClient(SLACK_TOKEN)
const prisma = new PrismaClient()

const BET_TYPE_TABLE: Record<BetType, string> = {
  WIN: '単勝',
  PLACE: '複勝'
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
  horses
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
        fields: horses.map((horse, i) => ({
          title: `${i + 1} 頭目`,
          value: `${BET_TYPE_TABLE[horse.type]}: ${horse.number}番`,
          short: true
        })),
        footer: APP_URL
      }
    ]
  })
  console.log(result)
}
