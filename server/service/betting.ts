import { BettingForm } from '$/types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getBettingsByDate = async (date: string) => {
  const bettings = await prisma.betting.findMany({
    where: { date },
    include: { user: true, horse: true }
  })

  return bettings
}

export const createBetting = async (
  date: string,
  courseId: string,
  userId: number,
  formData: BettingForm
) => {
  return await prisma.betting.create({
    data: {
      date,
      courseId,
      comment: formData.comment,
      race: formData.race,
      confidence: formData.confidence,
      betType: formData.betType,
      markCardType: formData.markCardtype,
      user: {
        connect: { id: userId }
      },
      horse: {
        create: formData.horses.map((horse) => ({
          number: horse.number,
          column: horse.column
        }))
      }
    }
  })
}

export const deleteBetting = async (id: number) => {
  return await prisma.betting.delete({ where: { id } })
}

// export const updateBetting = async (id: number, formData: BettingForm) => {
//   const oldBetting = await prisma.betting.findUnique({ where: { id } })
//   if (!oldBetting) {
//     return null
//   }
//   const oldHorses = await prisma.horse.findMany({
//     where: { bettingId: oldBetting.id }
//   })
//   return await prisma.betting.update({
//     where: { id },
//     data: {
//       comment: formData.comment,
//       horse: {
//         update: formData.horses
//       }
//     }
//   })
// }
