import { Box, Flex, Heading } from '@chakra-ui/react'
import HeaderItem from './HeaderItem'
import UserBanner from './UserBanner'

const Header: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      width="100%"
      position="sticky"
      m={0}
      top={0}
      zIndex={99}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          Memorand Uma
        </Heading>
      </Flex>

      <Box width={{ sm: 'full', md: 'auto' }} alignItems="center" flexGrow={1}>
        <HeaderItem>今日の予想</HeaderItem>
        <HeaderItem>注目馬メモ</HeaderItem>
      </Box>
      <UserBanner />
    </Flex>
  )
}

export default Header