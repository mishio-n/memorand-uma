import { Alert, AlertIcon, Box, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import FormationMarkCard from '~/components/FormationMarkCard'
import Loading from '~/components/Loading'
import NormalMarkCard from '~/components/NormalMarkCard'
import RaceList from '~/components/RaceList'
import WheelMarkCard from '~/components/WheelMarkCard'
import { BettingResponse, RaceCourse } from '~/server/types'
import { apiClient } from '~/utils/apiClient'
import { dayJP } from '~/utils/day-jp'

const Home = () => {
  const [session] = useSession()
  // 20時から前日投票を可能にするため、日本時間から4時間ずらす
  dayjs.extend(utc)
  const today = dayjs().utcOffset(9 + 4)
  const day = today.day()
  const date = today.format('YYYYMMDD')

  const [courses, setCourses] = useState<RaceCourse[]>()
  useEffect(() => {
    ;(async () => {
      const { body } = await apiClient.course.get()
      setCourses(body)
    })()
  }, [])

  const [bettings, setBettings] = useState<BettingResponse[]>([])
  // 子コンポーネントでフェッチさせるため関数を外出しする
  const fetchBettings = async () => {
    const { body } = await apiClient.betting.get({
      query: { date }
    })

    setBettings(body)
  }
  useEffect(() => {
    fetchBettings()
  }, [])

  if (!courses) return <Loading />
  return (
    <>
      <Flex alignItems="start" direction="column" overflowX="scroll">
        {!session && (
          <Alert status="warning" justifyContent="center">
            <AlertIcon />
            予想を入力するにはサインインしてください
          </Alert>
        )}
        <Flex alignItems="center" p={5}>
          <Text fontSize="4xl" color="glay.500" whiteSpace="nowrap">
            {today.format('YYYY年MM月DD日')}
          </Text>
          <Text
            fontSize="3xl"
            textColor={
              day === 0 ? 'tomato' : day === 6 ? 'cyan.700' : 'glay.500'
            }
          >
            ({dayJP(day)})
          </Text>
        </Flex>
        {/* <BettingButton courses={courses} date={date} fetcher={fetchBettings} /> */}
        <Flex>
          <NormalMarkCard
            courses={courses}
            date={date}
            fetcher={fetchBettings}
            onClose={() => {
              console.log('close')
            }}
          />
          {/* <FormationMarkCard
            courses={courses}
            date={date}
            fetcher={fetchBettings}
            onClose={() => {
              console.log('close')
            }}
          />
          <WheelMarkCard
            courses={courses}
            date={date}
            fetcher={fetchBettings}
            onClose={() => {
              console.log('close')
            }}
          /> */}
        </Flex>
        <Box width="90%" mt={4}>
          <RaceList raceCourses={courses} bettings={bettings} />
        </Box>
      </Flex>
    </>
  )
}

export default Home
