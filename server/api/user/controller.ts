import { getAllUsers } from '$/service/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async () => {
    const users = await getAllUsers()
    if (users.length === 0) {
      return { status: 404 }
    }

    return { status: 200, body: users }
  }
}))
