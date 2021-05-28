import {
  Box,
  Flex,
  Grid,
  HStack,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { AiFillStar } from 'react-icons/ai'
import { ImQrcode } from 'react-icons/im'
import { BettingData } from '~/server/types'
import { isSmartPhone } from '~/utils/is-smartPhone'
import { BET_TYPES } from '~/utils/mark-card-constants'
import { BetContent, BetTypeLabel, MarkCardTypeLabel } from '../BetTicketItems'

type BetTicketProps = {
  betting: BettingData
  course: string
}

const BetTicket: React.FC<BetTicketProps> = ({ betting, course }) => (
  <>
    <Flex
      borderStyle="solid"
      borderColor="gray.300"
      borderWidth="2px"
      bgGradient="repeating-linear(90deg, markCard.green.container.bg 0, markCard.green.container.bg 4px, green.50 4px, green.50 6px)"
      p={4}
    >
      <Flex direction="column" mr={4}>
        <Text fontWeight={900} fontSize={isSmartPhone ? 'xl' : '4xl'}>
          {course}
        </Text>
        <Flex alignItems="center" mb={4}>
          <Box
            bg="black"
            w={isSmartPhone ? '30px' : '50px'}
            h={isSmartPhone ? '30px' : '50px'}
            color="white"
            fontWeight={900}
            fontSize={isSmartPhone ? 'md' : '3xl'}
            textAlign="center"
            lineHeight={isSmartPhone ? '30px' : '50px'}
            mr={2}
          >
            {betting.race}
          </Box>
          <Text
            fontWeight={900}
            fontSize={isSmartPhone ? 'md' : '2xl'}
            whiteSpace="nowrap"
          >
            レース
          </Text>
        </Flex>
        <HStack spacing="10px" mb={4}>
          <ImQrcode size={isSmartPhone ? '30px' : '50px'} />
          <ImQrcode size={isSmartPhone ? '30px' : '50px'} />
        </HStack>
        <Text fontWeight={400} fontSize="md">
          by {betting.user.name}
        </Text>
      </Flex>
      <BetTypeLabel type={betting.betType} />
      <VStack spacing={12}>
        <MarkCardTypeLabel
          betTypeString={
            BET_TYPES.find((t) => t.type === betting.betType)?.name || ''
          }
          markCardtype={betting.markCardType}
        />
        <BetContent betting={betting} />
        <Grid
          templateColumns="repeat(10, 11px)"
          templateRows={`repeat(${betting.confidence / 10}, 18px)`}
        >
          {[...Array(betting.confidence)].map((v, i) => (
            <AiFillStar key={`star=${i}`} size="12px" />
          ))}
        </Grid>
      </VStack>
    </Flex>
    <Textarea
      borderColor="gray.700"
      bg="markCard.green.container.bg"
      borderWidth="1px"
      focusBorderColor="gray.700"
      resize="none"
      _hover={{
        borderColor: 'gray.700'
      }}
      isReadOnly
      mt={2}
      borderRadius="3px"
      value={betting.comment}
    />
  </>
)

export default BetTicket
