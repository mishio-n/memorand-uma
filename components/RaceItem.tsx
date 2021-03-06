import { Horse } from '.prisma/client'
import { HStack, Td } from '@chakra-ui/react'
import { BettingData, BettingResponse } from '~/server/types'
import BettingItem from './BettingItem'

type RaceItemProps = {
  bettings: BettingResponse[]
  course: string
}

const RaceItem: React.FC<RaceItemProps> = ({ bettings, course }) => {
  const columnMap = (
    horses: Horse[]
  ): Pick<BettingData, 'column1' | 'column2' | 'column3'> => {
    const column1: number[] = []
    const column2: number[] = []
    const column3: number[] = []
    horses.forEach((horse) => {
      switch (horse.column) {
        case 1:
          column1.push(horse.number)
          break
        case 2:
          column2.push(horse.number)
          break
        case 3:
          column3.push(horse.number)
          break
        default:
          return
      }
    })

    return {
      column1,
      column2,
      column3
    }
  }

  return (
    <Td backgroundColor="gray.100" border="1px">
      <HStack alignItems="center">
        {bettings.map((betting, i) => (
          <BettingItem
            key={`${betting.courseId}-${betting.race}-${i}`}
            course={course}
            betting={{ ...betting, ...columnMap(betting.horse) }}
          />
        ))}
      </HStack>
    </Td>
  )
}
export default RaceItem
