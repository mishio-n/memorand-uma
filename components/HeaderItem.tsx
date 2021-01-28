import { Button } from '@chakra-ui/react'

const HeaderItem: React.FC = ({ children }) => {
  return (
    <Button
      variant="ghost"
      p={4}
      _active={{ backgroundColor: '$white.100', transform: 'scale(0.95)' }}
      _focus={{ backgroundColor: '$white.100' }}
      _hover={{ backgroundColor: '$white.100' }}
    >
      {children}
    </Button>
  )
}

export default HeaderItem
