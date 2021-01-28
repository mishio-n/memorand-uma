import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { BettingData, RaceCourse } from '~/server/types'
import RaceItem from './RaceItem'

const RACE_NUM = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

type RaceListProps = {
  raceCourses: RaceCourse[]
  bettings: BettingData[]
}

const RaceList: React.FC<RaceListProps> = ({ raceCourses, bettings }) => {
  return (
    <Table variant="simple" border="1px">
      <Thead>
        <Tr>
          <Th width="0.5rem" border="1px"></Th>
          {raceCourses.map((raceCourse) => (
            <Th key={`course-${raceCourse.id}`} border="1px" textAlign="center">
              {raceCourse.course}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {RACE_NUM.map((race) => (
          <Tr key={race}>
            <Td border="1px" textAlign="center">
              {race}
            </Td>
            {raceCourses.map((raceCourse) => (
              <RaceItem
                key={`race-${raceCourse.id}-${race}`}
                course={raceCourse.course}
                bettings={bettings
                  .filter((b) => b.courseId === raceCourse.id)
                  .filter((b) => b.race === race)}
              />
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default RaceList
