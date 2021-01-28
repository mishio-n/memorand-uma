import { Flex } from '@chakra-ui/react'

const Container: React.FC = ({ children }) => (
  <Flex
    borderColor="markCard.containerBorder"
    borderRadius="10px"
    borderWidth="2px"
    backgroundColor="markCard.containerBg"
    py={1}
    px={2}
    direction="column"
    alignItems="center"
  >
    {children}
  </Flex>
)

export default Container
