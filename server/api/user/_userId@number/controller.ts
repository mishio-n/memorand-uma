import { getUserInfoById } from '$/service/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params }) => {
    const userInfo = await getUserInfoById(params.userId)
    if (userInfo) {
      return { status: 200, body: userInfo }
    }

    return { status: 404 }
  }
}))
