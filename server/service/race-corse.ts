import { RaceCourse } from '$/types'
import axios from 'axios'

export const getRaceCourses = async () => {
  const { data } = await axios.get<RaceCourse[]>(
    'https://jxtr9ezuxg.execute-api.ap-northeast-1.amazonaws.com/courses'
  )

  return data
}
