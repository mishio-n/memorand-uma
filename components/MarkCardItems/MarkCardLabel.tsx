import { Box } from '@chakra-ui/react'

type MarkCardLabel = {
  bg: string
}

export const MarkCardLabel: React.FC<MarkCardLabel> = ({ bg, children }) => (
  <Box
    display="inline-block"
    color="white"
    backgroundColor={bg}
    borderRadius="16px"
    height="16px"
    padding="0 14px"
    fontSize="xs"
    textAlign="center"
    mb={2}
  >
    {children}
  </Box>
)
