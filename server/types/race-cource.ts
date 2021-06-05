export type RaceCourseType = 'main' | 'local' | 'nra' | 'overseas'

export type RaceCourse = {
  id: string
  course: string
  active: boolean
  type: RaceCourseType
}
