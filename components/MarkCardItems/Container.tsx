import { Flex } from '@chakra-ui/react'

type MarkCardContainerProps = {
  border: string
  bg: string
}

export const MarkCardContainer: React.FC<MarkCardContainerProps> = ({
  bg,
  border,
  children
}) => (
  <Flex
    borderColor={border}
    borderRadius="10px"
    borderWidth="2px"
    backgroundColor={bg}
    py={1}
    px={2}
    direction="column"
    alignItems="center"
  >
    {children}
  </Flex>
)
