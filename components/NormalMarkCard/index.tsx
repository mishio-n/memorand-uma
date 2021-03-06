import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Text,
  useRadioGroup,
  VStack
} from '@chakra-ui/react'
import { BetType, MarkCardType } from '@prisma/client'
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
import {
  BET_TYPES,
  CONFIDENCE_NUM,
  getSerialFromOne,
  HORSE_NUM,
  RACE_NUM
} from '~/utils/mark-card-constants'

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
  const [column1, setColumn1] = useState<BettingHorse>()
  const [column2, setColumn2] = useState<BettingHorse>()
  const [column3, setColumn3] = useState<BettingHorse>()
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
    onChange: (nextValue: BetType) => {
      setColumn1(undefined)
      setColumn2(undefined)
      setColumn3(undefined)
      setBetType(nextValue)
    }
  })

  const {
    getRootProps: getRaceRootProps,
    getRadioProps: getRaceRadioProps
  } = useRadioGroup({
    name: 'race',
    onChange: (nextValue: number) => setRace(nextValue)
  })

  const {
    getRootProps: getHorseNoColumn1RootProps,
    getRadioProps: getHorseNoColumn1RadioProps
  } = useRadioGroup({
    name: 'column1',
    onChange: (nextValue: string) =>
      setColumn1({ number: +nextValue, column: 1 })
  })

  const {
    getRootProps: getHorseNoColumn2RootProps,
    getRadioProps: getHorseNoColumn2RadioProps
  } = useRadioGroup({
    name: 'column2',
    onChange: (nextValue: string) =>
      setColumn2({ number: +nextValue, column: 2 })
  })

  const {
    getRootProps: getHorseNoColumn3RootProps,
    getRadioProps: getHorseNoColumn3RadioProps
  } = useRadioGroup({
    name: 'column3',
    onChange: (nextValue: string) =>
      setColumn3({ number: +nextValue, column: 3 })
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
      betType: BetType
      markCardtype: MarkCardType
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
        background="markCard.green.bg"
        borderRadius="5px 5px 0 0"
        p={5}
        pb={0}
        boxShadow="lg"
        boxSizing="border-box"
        w="100%"
      >
        <Flex direction="column">
          <Flex mb={2}>
            <Flex mr={2}>
              <MarkCardContainer
                border="markCard.green.container.border"
                bg="markCard.green.container.bg"
              >
                <MarkCardLabel bg="markCard.green.label">場名</MarkCardLabel>
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

            <Flex mr={2}>
              <MarkCardContainer
                border="markCard.green.container.border"
                bg="markCard.green.container.bg"
              >
                <MarkCardLabel bg="markCard.green.label">レース</MarkCardLabel>
                <Grid
                  templateColumns="repeat(6, 20px)"
                  templateRows="repeat(2, 1fr)"
                  rowGap={1}
                  {...getRaceRootProps()}
                >
                  {RACE_NUM.map((num) => {
                    const radio = getRaceRadioProps({ value: num.toString() })
                    return (
                      <NumberRadio
                        key={`race-${num}`}
                        {...radio}
                        disabled={false}
                      >
                        {num}
                      </NumberRadio>
                    )
                  })}
                </Grid>
              </MarkCardContainer>
            </Flex>
            <Flex mr={2}>
              <MarkCardContainer
                border="markCard.green.container.border"
                bg="markCard.green.container.bg"
              >
                <MarkCardLabel bg="markCard.green.label">式別</MarkCardLabel>
                <HStack {...getBettingTypeRootProps()}>
                  {BET_TYPES.map((bet) => {
                    const radio = getBettingTypeRadioProps({ value: bet.type })
                    return (
                      <NormalRadio key={bet.type} {...radio}>
                        <VStack
                          justifyContent="center"
                          spacing={bet.name.length === 2 ? '20px' : '0px'}
                        >
                          {bet.name.split('').map((text) => (
                            <Text color="gray.700" key={text}>
                              {text}
                            </Text>
                          ))}
                        </VStack>
                      </NormalRadio>
                    )
                  })}
                </HStack>
              </MarkCardContainer>
            </Flex>
            <Flex>
              <MarkCardContainer
                border="markCard.green.container.border"
                bg="markCard.green.container.bg"
              >
                <MarkCardLabel bg="markCard.green.label">自信度</MarkCardLabel>
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
                        <NumberRadio
                          key={`confidence-${num}-1`}
                          {...radio}
                          disabled={false}
                        >
                          {num}
                        </NumberRadio>
                      )
                    })}
                  </Grid>
                </Box>
              </MarkCardContainer>
            </Flex>
          </Flex>

          <Flex mb={2} width="100%">
            <Flex>
              <MarkCardContainer
                border="markCard.green.container.border"
                bg="markCard.green.container.bg"
              >
                <MarkCardLabel bg="markCard.green.label">1頭目</MarkCardLabel>
                <Box>
                  <Grid
                    templateColumns="repeat(9, 20px)"
                    templateRows="repeat(2, 1fr)"
                    rowGap={1}
                    {...getHorseNoColumn1RootProps()}
                  >
                    {HORSE_NUM.map((num) => {
                      const radio = getHorseNoColumn1RadioProps({
                        value: num.toString()
                      })
                      return (
                        <NumberRadio
                          key={`horse-${num}-1`}
                          {...radio}
                          disabled={false}
                        >
                          {num}
                        </NumberRadio>
                      )
                    })}
                  </Grid>
                </Box>
              </MarkCardContainer>
            </Flex>
            <Flex>
              <MarkCardContainer
                border="markCard.green.container.border"
                bg={
                  betType === 'WIN' || betType === 'PLACE'
                    ? 'gray.400'
                    : 'markCard.green.container.bg'
                }
              >
                <MarkCardLabel bg="markCard.green.label">2頭目</MarkCardLabel>
                <Box>
                  <Grid
                    templateColumns="repeat(9, 20px)"
                    templateRows="repeat(2, 1fr)"
                    rowGap={1}
                    {...getHorseNoColumn2RootProps()}
                  >
                    {HORSE_NUM.map((num) => {
                      const radio = getHorseNoColumn2RadioProps({
                        value: num.toString(),
                        disabled: betType === 'WIN' || betType === 'PLACE'
                      })
                      return (
                        <NumberRadio
                          key={`horse-${num}-1`}
                          {...radio}
                          disabled={betType === 'WIN' || betType === 'PLACE'}
                        >
                          {num}
                        </NumberRadio>
                      )
                    })}
                  </Grid>
                </Box>
              </MarkCardContainer>
            </Flex>
            <Flex>
              <MarkCardContainer
                border="markCard.green.container.border"
                bg={
                  betType === 'WIN' ||
                  betType === 'PLACE' ||
                  betType === 'QUINELLA' ||
                  betType === 'BRACKET_QUINELLA' ||
                  betType === 'QUINELLA_PLACE' ||
                  betType === 'EXACTA'
                    ? 'gray.400'
                    : 'markCard.green.container.bg'
                }
              >
                <MarkCardLabel bg="markCard.green.label">3頭目</MarkCardLabel>
                <Box>
                  <Grid
                    templateColumns="repeat(9, 20px)"
                    templateRows="repeat(2, 1fr)"
                    rowGap={1}
                    {...getHorseNoColumn3RootProps()}
                  >
                    {HORSE_NUM.map((num) => {
                      const radio = getHorseNoColumn3RadioProps({
                        value: num.toString(),
                        disabled:
                          betType === 'WIN' ||
                          betType === 'PLACE' ||
                          betType === 'QUINELLA' ||
                          betType === 'BRACKET_QUINELLA' ||
                          betType === 'QUINELLA_PLACE' ||
                          betType === 'EXACTA'
                      })
                      return (
                        <NumberRadio
                          key={`horse-${num}-1`}
                          {...radio}
                          disabled={
                            betType === 'WIN' ||
                            betType === 'PLACE' ||
                            betType === 'QUINELLA' ||
                            betType === 'BRACKET_QUINELLA' ||
                            betType === 'QUINELLA_PLACE' ||
                            betType === 'EXACTA'
                          }
                        >
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
            border="markCard.green.container.border"
            bg="markCard.green.container.bg"
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
                  horses: [column1, column2, column3].filter(
                    (horse) => horse !== undefined
                  ) as BettingHorse[],
                  betType,
                  markCardtype: 'NORMAL'
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
                setColumn1(undefined)
                setColumn2(undefined)
                setColumn3(undefined)
                fetcher()
                onClose()
              })
            }
            mt={2}
            mx={40}
            isDisabled={
              session === undefined ||
              session === null ||
              courseId === undefined ||
              race === undefined ||
              column1 === undefined
            }
            bg="markCard.green.container.bg"
            borderColor="markCard.green.container.border"
            borderWidth="2px"
            _hover={{
              bg: 'markCard.green.container.border'
            }}
            _focus={{
              bg: 'markCard.green.container.border'
            }}
            _active={{
              bg: 'markCard.green.container.border'
            }}
          >
            投票する
          </Button>
        </Flex>
        <HStack spacing={5} pt={5}>
          {getSerialFromOne(22).map((num) => (
            <Box
              w="8px"
              h="15px"
              bg="markCard.green.barcode"
              borderRadius="2px 2px 0 0"
              key={`bottom-symbol-${num}`}
            />
          ))}
        </HStack>
      </Box>
    </>
  )
}

export default MarkCard
