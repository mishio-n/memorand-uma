import { Box } from '@chakra-ui/react'

const Label: React.FC = ({ children }) => (
  <Box
    display="inline-block"
    color="white"
    backgroundColor="rgba(0,12,28,1.0)"
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

export default Label
