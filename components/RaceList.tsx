import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { BettingResponse, RaceCourse } from '~/server/types'
import { RACE_NUM } from '~/utils/mark-card-constants'
import RaceItem from './RaceItem'

type RaceListProps = {
  raceCourses: RaceCourse[]
  bettings: BettingResponse[]
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
