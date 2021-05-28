import { MarkCardType } from '.prisma/client'
import { Box, Text } from '@chakra-ui/react'
import { isSmartPhone } from '~/utils/is-smartPhone'
import { MARK_CARD_TYPE_TABLE } from '~/utils/mark-card-constants'

type MarkCardTypeLabelProps = {
  betTypeString: string
  markCardtype: MarkCardType
}

export const MarkCardTypeLabel: React.FC<MarkCardTypeLabelProps> = ({
  betTypeString,
  markCardtype
}) => {
  if (markCardtype === 'NORMAL') return <Box h={8} />

  const labelText =
    markCardtype === 'WHEEL'
      ? `${betTypeString}流し`
      : MARK_CARD_TYPE_TABLE[markCardtype]
  return (
    <Box borderWidth="1px" borderStyle="solid" borderColor="gray.700">
      <Text size={isSmartPhone ? 'xl' : '3xl'}>{labelText}</Text>
    </Box>
  )
}
