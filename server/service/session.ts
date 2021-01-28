import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getSessionByAccessToken = async (accessToken: string) => {
  const session = await prisma.session.findUnique({ where: { accessToken } })
  return session
}
