import { Grid, Td } from '@chakra-ui/react'
import { BettingData } from '~/server/types'
import BettingItem from './BettingItem'

type RaceItemProps = {
  bettings: BettingData[]
  course: string
}

const RaceItem: React.FC<RaceItemProps> = ({ bettings, course }) => {
  return (
    <Td backgroundColor="gray.100" border="1px">
      <Grid
        templateColumns="repeat(10, 20px)"
        templateRows={
          bettings.length > 10 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'
        }
        rowGap={1}
        columnGap={4}
      >
        {bettings.map((betting, i) => (
          <BettingItem
            key={`${betting.courseId}-${betting.race}-${i}`}
            course={course}
            betting={betting}
          />
        ))}
      </Grid>
    </Td>
  )
}
export default RaceItem
