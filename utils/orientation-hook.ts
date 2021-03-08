import { useEffect, useState } from 'react'

const getOrientation = (): OrientationType =>
  typeof window !== 'undefined'
    ? window.screen.orientation.type
    : 'portrait-primary'

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation())

  const updateOrientation = () => {
    setOrientation(getOrientation())
    console.log(window)
  }

  useEffect(() => {
    window.addEventListener('orientationchange', updateOrientation)
    return () => {
      window.removeEventListener('orientationchange', updateOrientation)
    }
  }, [])

  return orientation
}
