import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getBettingHorses = async (bettingId: number) => {
  return await prisma.horse.findMany({ where: { bettingId } })
}
