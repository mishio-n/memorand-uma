import { getBettingHorses } from '$/service/horse'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => {
    const horses = await getBettingHorses(query.bettingId)

    if (horses.length === 0) {
      return { status: 404 }
    }
    return { status: 200, body: horses }
  }
}))
