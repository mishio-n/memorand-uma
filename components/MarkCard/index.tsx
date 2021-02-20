import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  useRadioGroup
} from '@chakra-ui/react'
import { BetType } from '@prisma/client'
import { useSession } from 'next-auth/client'
import { useState } from 'react'
import { BettingHorse, RaceCourse } from '~/server/types'
import { apiClient } from '~/utils/apiClient'
import BettingComment from './BettingComment'
import Container from './Container'
import Label from './Label'
import NormalRadio from './NormalRadio'
import NumberRadio from './NumberRadio'

const HORSE_NUM = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18
]

const RACE_NUM = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const BET_TYPES: { name: string; type: BetType }[] = [
  {
    name: '単勝',
    type: 'WIN'
  },
  {
    name: '複勝',
    type: 'PLACE'
  }
]

const CONFIDENCE_NUM = [30, 20, 10, 5, 4, 3, 2, 1]

type MarkCardProps = {
  courses: RaceCourse[]
  date: string
  onClose: () => void
  fetcher: () => Promise<void>
}

const MarkCard: React.FC<MarkCardProps> = ({
  courses,
  date,
  onClose,
  fetcher
}) => {
  // session
  const [session] = useSession()

  // state
  const [courseId, setCourseId] = useState<string>()
  const [race, setRace] = useState<number>()
  const [horseNo, setHorseNo] = useState<number>()
  const [betType, setBetType] = useState<BetType>('WIN')
  const [confidence, setConfidence] = useState<number>(1)
  const [comment, setComment] = useState('')

  // radio
  const {
    getRootProps: getCourseRootProps,
    getRadioProps: getCourseRadioProps
  } = useRadioGroup({
    name: 'course',
    onChange: (nextValue: string) => setCourseId(nextValue)
  })

  const {
    getRootProps: getBettingTypeRootProps,
    getRadioProps: getBettingTypeRadioProps
  } = useRadioGroup({
    name: 'bettingType',
    defaultValue: 'WIN',
    onChange: (nextValue: BetType) => setBetType(nextValue)
  })

  const {
    getRootProps: getRaceRootProps,
    getRadioProps: getRaceRadioProps
  } = useRadioGroup({
    name: 'race',
    onChange: (nextValue: number) => setRace(nextValue)
  })

  const {
    getRootProps: getHorseNoRootProps,
    getRadioProps: getHorseNoRadioProps
  } = useRadioGroup({
    name: 'horseNo',
    onChange: (nextValue: number) => setHorseNo(nextValue)
  })

  const {
    getRootProps: getConfidenceRootProps,
    getRadioProps: getConfidenceRadioProps
  } = useRadioGroup({
    name: 'confidence',
    defaultValue: '1',
    onChange: (nextValue: number) => setConfidence(nextValue)
  })

  const bet = async (
    body: {
      race: number
      comment: string
      horses: BettingHorse[]
      confidence: number
    },
    query: { date: string; courseId: string; accessToken: string }
  ) => {
    return await apiClient.betting.post({
      body,
      query
    })
  }
  return (
    <>
      <Box
        background="markCard.bg"
        borderRadius="5px 5px 0 0"
        p={5}
        pb={0}
        boxShadow="lg"
      >
        <Flex direction="column">
          <Flex mb={2}>
            <Flex mr={2}>
              <Container>
                <Label>場名</Label>
                <HStack {...getCourseRootProps()}>
                  {courses.map((course) => {
                    const radio = getCourseRadioProps({ value: course.id })
                    return (
                      <NormalRadio key={course.id} {...radio}>
                        {course.course}
                      </NormalRadio>
                    )
                  })}
                </HStack>
              </Container>
            </Flex>

            <Flex>
              <Container>
                <Label>レース</Label>
                <Grid
                  templateColumns="repeat(6, 20px)"
                  templateRows="repeat(2, 1fr)"
                  rowGap={1}
                  {...getRaceRootProps()}
                >
                  {RACE_NUM.map((num) => {
                    const radio = getRaceRadioProps({ value: num.toString() })
                    return (
                      <NumberRadio key={`race-${num}`} {...radio}>
                        {num}
                      </NumberRadio>
                    )
                  })}
                </Grid>
              </Container>
            </Flex>
          </Flex>
          <Flex mb={2} width="100%" justifyContent="space-between">
            <Flex mr={2}>
              <Container>
                <Label>馬番</Label>
                <Box>
                  <Grid
                    templateColumns="repeat(9, 20px)"
                    templateRows="repeat(2, 1fr)"
                    rowGap={1}
                    {...getHorseNoRootProps()}
                  >
                    {HORSE_NUM.map((num) => {
                      const radio = getHorseNoRadioProps({
                        value: num.toString()
                      })
                      return (
                        <NumberRadio key={`horse-${num}-1`} {...radio}>
                          {num}
                        </NumberRadio>
                      )
                    })}
                  </Grid>
                </Box>
              </Container>
            </Flex>
            <Flex mr={2}>
              <Container>
                <Label>式別</Label>
                <HStack {...getBettingTypeRootProps()}>
                  {BET_TYPES.map((bet) => {
                    const radio = getBettingTypeRadioProps({ value: bet.type })
                    return (
                      <NormalRadio key={bet.type} {...radio}>
                        {bet.name}
                      </NormalRadio>
                    )
                  })}
                </HStack>
              </Container>
            </Flex>
            <Flex>
              <Container>
                <Label>自信度</Label>
                <Box>
                  <Grid
                    templateColumns="repeat(4, 20px)"
                    templateRows="repeat(2, 1fr)"
                    rowGap={1}
                    {...getConfidenceRootProps()}
                  >
                    {CONFIDENCE_NUM.map((num) => {
                      const radio = getConfidenceRadioProps({
                        value: num.toString()
                      })
                      return (
                        <NumberRadio key={`confidence-${num}-1`} {...radio}>
                          {num}
                        </NumberRadio>
                      )
                    })}
                  </Grid>
                </Box>
              </Container>
            </Flex>
          </Flex>
          <BettingComment setComment={setComment} />
          <Button
            onClick={() =>
              // ボタン押下可能時はnon-nullが保証できる
              bet(
                {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  race: +race!,
                  comment,
                  confidence: +confidence,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  horses: [{ number: +horseNo!, type: betType }]
                },
                {
                  date,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  accessToken: session!.accessToken!,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  courseId: courseId!
                }
              ).then(() => {
                // モーダルクローズ時にデータを再取得する
                fetcher()
                onClose()
              })
            }
            mt={2}
            mx={20}
            isDisabled={
              session === undefined ||
              session === null ||
              courseId === undefined ||
              race === undefined ||
              horseNo === undefined
            }
            bg="markCard.containerBg"
            borderColor="markCard.containerBorder"
            borderWidth="2px"
            _hover={{
              bg: 'markCard.containerBorder'
            }}
            _focus={{
              bg: 'markCard.containerBorder'
            }}
            _active={{
              bg: 'markCard.containerBorder'
            }}
          >
            投票する
          </Button>
        </Flex>
        <HStack spacing={5} pt={5}>
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="rgba(0,12,28,1.0)"
            borderRadius="2px 2px 0 0"
          />
        </HStack>
      </Box>
    </>
  )
}

export default MarkCard
