import { getRaceCourses } from '$/service/race-corse'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async () => {
    try {
      const raceCourses = await getRaceCourses()

      return { status: 200, body: raceCourses }
    } catch (error) {
      return { status: 500 }
    }
  }
}))
