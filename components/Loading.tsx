import { Flex, Text } from '@chakra-ui/react'

const Loading: React.FC = () => (
  <Flex p={10} px={20} justifyContent="center" alignItems="center">
    <img src="/horse.gif" alt="loading..." />
    <Text size="xl">Loading...</Text>
  </Flex>
)
export default Loading
