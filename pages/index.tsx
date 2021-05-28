import { Alert, AlertIcon, Box, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import Loading from '~/components/Loading'
import NormalMarkCard from '~/components/NormalMarkCard'
import MarkCardSelector from '~/components/MarkCardSelector'
import RaceList from '~/components/RaceList'
import { BettingResponse, RaceCourse } from '~/server/types'
import { apiClient } from '~/utils/apiClient'
import { dayJP } from '~/utils/day-jp'
import { isSmartPhone } from '~/utils/is-smartPhone'
import { useScreenOrientation } from '~/utils/orientation-hook'

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

  const orientation = useScreenOrientation()
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
      <Flex alignItems="center" direction="column">
        {!session && (
          <Alert status="warning" justifyContent="center">
            <AlertIcon />
            予想を入力するにはサインインしてください
          </Alert>
        )}
        {((!isSmartPhone && orientation === 'landscape-primary') ||
          orientation === 'portrait-primary') && (
          <Flex alignItems="center" py={5}>
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
        )}
        {/* <BettingButton courses={courses} date={date} fetcher={fetchBettings} /> */}
        {(orientation === 'landscape-primary' ||
          orientation === 'landscape-secondary') && (
          <Flex>
            <MarkCardSelector
              courses={courses}
              date={date}
              fetcher={fetchBettings}
              onClose={() => {
                console.log('close')
              }}
            />
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
        )}
        {((!isSmartPhone && orientation === 'landscape-primary') ||
          orientation === 'portrait-primary') && (
          <Box width="90%" mt={4}>
            <RaceList raceCourses={courses} bettings={bettings} />
          </Box>
        )}
      </Flex>
    </>
  )
}

export default Home
