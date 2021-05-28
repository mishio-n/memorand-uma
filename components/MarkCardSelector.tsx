import { useState } from 'react'
import { RaceCourse } from '~/server/types'
import NormalMarkCard from '~/components/NormalMarkCard'
import WheelMarkCard from '~/components/WheelMarkCard'
import FormationMarkCard from '~/components/FormationMarkCard'

type MarkCardProps = {
  courses: RaceCourse[]
  date: string
  onClose: () => void
  fetcher: () => Promise<void>
}

const MarkCardSelector: React.FC<MarkCardProps> = (props) => {
  const [index, setIndex] = useState(0)
  const markCards = [NormalMarkCard, WheelMarkCard, FormationMarkCard]
  return (
    <div>
      <FormationMarkCard {...props} />
    </div>
  )
}

export default MarkCardSelector
