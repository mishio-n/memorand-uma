import { RaceCourse, RaceCourseType } from '$/types'
import axios from 'axios'
import { RACECOURSE_API_KEY, RACECOURSE_API_URL } from './envValues'

// MicroCMS からの返却データ(必要パラメータのみ)
type RaceCourseResponse = {
  contents: {
    courseId: number
    course: string
    active: boolean
    type: RaceCourseType
  }[]
  totalCount: number
}

export const getRaceCourses = async (): Promise<RaceCourse[]> => {
  const { data } = await axios.get<RaceCourseResponse>(RACECOURSE_API_URL, {
    params: {
      // 開催中のみ取得
      filters: 'active[equals]true'
    },
    headers: {
      'X-API-KEY': RACECOURSE_API_KEY
    }
  })

  return data.contents.map(({ active, course, courseId, type }) => ({
    // microCMSだと id フィールドが使用不可なので、ここで変換する
    id: courseId.toString(),
    course,
    active,
    type
  }))
}
