import { BetType } from '.prisma/client'
import { Text, VStack } from '@chakra-ui/react'
import { BET_TYPES } from 'utils/mark-card-constants'

type BetTtpeLabelProps = {
  type: BetType
}

export const BetTypeLabel: React.FC<BetTtpeLabelProps> = ({ type }) => {
  const labelText = BET_TYPES.find((t) => t.type === type)?.name.split('') || [
    '予',
    '想'
  ]

  return (
    <VStack
      spacing={labelText.length === 2 ? '50px' : '20px'}
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.700"
      width="50px"
      justifyContent="center"
      p={2}
      mr={4}
    >
      {labelText.map((text) => (
        <Text fontSize="3xl" color="gray.700" fontWeight={900} key={text}>
          {text}
        </Text>
      ))}
    </VStack>
  )
}
