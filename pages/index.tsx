import { Alert, AlertIcon, Box, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import BettingButton from '~/components/BettingButton'
import Loading from '~/components/Loading'
import RaceList from '~/components/RaceList'
import { BettingData, RaceCourse } from '~/server/types'
import { apiClient } from '~/utils/apiClient'

const dayJP = (day: number) => {
  switch (day) {
    case 0:
      return '日'
    case 1:
      return '月'
    case 2:
      return '火'
    case 3:
      return '水'
    case 4:
      return '木'
    case 5:
      return '金'
    case 6:
      return '土'
  }
}

const Home = () => {
  const [session] = useSession()
  const today = dayjs()
  const day = today.day()
  const date = today.format('YYYYMMDD')

  const [courses, setCourses] = useState<RaceCourse[]>()
  useEffect(() => {
    ;(async () => {
      const { body } = await apiClient.course.get()
      setCourses(body)
    })()
  }, [])

  const [bettings, setBettings] = useState<BettingData[]>([])
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
        <Flex alignItems="center" p={8}>
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
        <BettingButton courses={courses} date={date} fetcher={fetchBettings} />
        <Box width="90%">
          <RaceList raceCourses={courses} bettings={bettings} />
        </Box>
      </Flex>
    </>
  )
}

export default Home