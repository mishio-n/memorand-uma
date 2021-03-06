import { Horse } from '@prisma/client'

export type Methods = {
  get: {
    query: {
      bettingId: number
    }
    resBody: Horse[]
  }
}
