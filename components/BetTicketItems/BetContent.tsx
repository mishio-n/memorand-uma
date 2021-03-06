import { Box, Flex, HStack } from '@chakra-ui/react'
import { BettingData } from '~/server/types'
import { ColumnConnector } from './ColumnConnector'

type BetContentProps = {
  betting: BettingData
}

export const BetContent: React.FC<BetContentProps> = ({ betting }) => {
  return (
    <HStack justifyContent="center">
      {betting.column1.map((num) => (
        <Flex alignItems="center" key={`column1-${num}`}>
          <Box
            bg="rgba(255, 255, 255, 0.0)"
            w="40px"
            h="40px"
            color="gray.700"
            fontWeight={400}
            fontSize="3xl"
            textAlign="center"
            lineHeight="40px"
            borderStyle="solid"
            borderWidth="1px"
            borderColor="gray.700"
          >
            {num}
          </Box>
        </Flex>
      ))}
      {betting.column2.length > 0 ? (
        <ColumnConnector betType={betting.betType} />
      ) : undefined}
      {betting.column2.map((num) => (
        <Flex alignItems="center" key={`column1-${num}`}>
          <Box
            bg="rgba(255, 255, 255, 0.0)"
            w="40px"
            h="40px"
            color="gray.700"
            fontWeight={400}
            fontSize="3xl"
            textAlign="center"
            lineHeight="40px"
            borderStyle="solid"
            borderWidth="1px"
            borderColor="gray.700"
          >
            {num}
          </Box>
        </Flex>
      ))}
      {betting.column3.length > 0 ? (
        <ColumnConnector betType={betting.betType} />
      ) : undefined}
      {betting.column3.map((num) => (
        <Flex alignItems="center" key={`column1-${num}`}>
          <Box
            bg="rgba(255, 255, 255, 0.0)"
            w="40px"
            h="40px"
            color="gray.700"
            fontWeight={400}
            fontSize="3xl"
            textAlign="center"
            lineHeight="40px"
            borderStyle="solid"
            borderWidth="1px"
            borderColor="gray.700"
          >
            {num}
          </Box>
        </Flex>
      ))}
    </HStack>
  )
}
