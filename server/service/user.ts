import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUserInfoById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } })
  if (user) {
    return user
  }
}

export const getAllUsers = async () => {
  return await prisma.user.findMany()
}
