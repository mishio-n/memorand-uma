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
import {
  MarkCardContainer,
  MarkCardLabel,
  NormalRadio,
  BettingComment,
  NumberRadio
} from '~/components/MarkCardItems'

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

const FormationMarkCard: React.FC<MarkCardProps> = ({
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
        background="markCard.red.bg"
        borderRadius="5px 5px 0 0"
        p={5}
        pb={0}
        boxShadow="lg"
      >
        <Flex direction="column">
          <Flex mb={2}>
            <Flex mr={2}>
              <MarkCardContainer
                border="markCard.red.container.border"
                bg="markCard.red.container.bg"
              >
                <MarkCardLabel bg="markCard.red.label">場名</MarkCardLabel>
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
              </MarkCardContainer>
            </Flex>

            <Flex>
              <MarkCardContainer
                border="markCard.red.container.border"
                bg="markCard.red.container.bg"
              >
                <MarkCardLabel bg="markCard.red.label">レース</MarkCardLabel>
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
              </MarkCardContainer>
            </Flex>
          </Flex>
          <Flex mb={2} width="100%" justifyContent="space-between">
            <Flex mr={2}>
              <MarkCardContainer
                border="markCard.red.container.border"
                bg="markCard.red.container.bg"
              >
                <MarkCardLabel bg="markCard.red.label">馬番</MarkCardLabel>
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
              </MarkCardContainer>
            </Flex>
            <Flex mr={2}>
              <MarkCardContainer
                border="markCard.red.container.border"
                bg="markCard.red.container.bg"
              >
                <MarkCardLabel bg="markCard.red.label">式別</MarkCardLabel>
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
              </MarkCardContainer>
            </Flex>
            <Flex>
              <MarkCardContainer
                border="markCard.red.container.border"
                bg="markCard.red.container.bg"
              >
                <MarkCardLabel bg="markCard.red.label">自信度</MarkCardLabel>
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
              </MarkCardContainer>
            </Flex>
          </Flex>
          <BettingComment
            setComment={setComment}
            border="markCard.red.container.border"
            bg="markCard.red.container.bg"
          />
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
            bg="markCard.red.container.bg"
            borderColor="markCard.red.container.border"
            borderWidth="2px"
            _hover={{
              bg: 'markCard.red.container.border'
            }}
            _focus={{
              bg: 'markCard.red.container.border'
            }}
            _active={{
              bg: 'markCard.red.container.border'
            }}
          >
            投票する
          </Button>
        </Flex>
        <HStack spacing={5} pt={5}>
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
          <Box
            w="8px"
            h="15px"
            bg="markCard.red.barcode"
            borderRadius="2px 2px 0 0"
          />
        </HStack>
      </Box>
    </>
  )
}

export default FormationMarkCard
