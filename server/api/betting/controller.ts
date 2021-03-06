import { createBetting, getBettingsByDate } from '$/service/betting'
import { notifyNewBetting } from '$/service/slack'
import { getSessionByAccessToken } from '$/service/session'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => {
    const bettings = await getBettingsByDate(query.date)
    return { status: 200, body: bettings }
  },
  post: async ({ query, body }) => {
    // セッションオブジェクトにuserId がないので、サーバーサイドでアクセストークン経由で取得する
    const session = await getSessionByAccessToken(query.accessToken)
    if (!session) {
      return { status: 500 }
    }

    try {
      const newBetting = await createBetting(
        query.date,
        query.courseId,
        session.userId,
        body
      )

      // slack通知は非同期で動かす
      notifyNewBetting({
        userId: session.userId,
        race: body.race,
        comment: body.comment,
        courseId: query.courseId,
        confidence: body.confidence,
        horses: body.horses,
        betType: body.betType,
        markCardType: body.markCardtype
      })

      return { status: 200, body: newBetting }
    } catch (error) {
      console.log(error)
      return { status: 500 }
    }
  }
}))
