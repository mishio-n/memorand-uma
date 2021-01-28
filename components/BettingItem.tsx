import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { AiFillStar } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { ImQrcode } from 'react-icons/im'
import { BettingData } from '~/server/types'

type BettingItemProps = {
  betting: BettingData
  course: string
}

const BettingItem: React.FC<BettingItemProps> = ({ betting, course }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box>
        {betting.user.image ? (
          <Box
            backgroundImage={`url(${betting.user.image})`}
            backgroundPosition="center"
            backgroundSize="cover"
            borderRadius="50%"
            w="25px"
            h="25px"
            onClick={onOpen}
          />
        ) : (
          <FaUserCircle onClick={onOpen} />
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody px={2}>
            <Flex
              borderStyle="solid"
              borderColor="gray.300"
              borderWidth="2px"
              bgGradient="repeating-linear(90deg, markCard.containerBg 0, markCard.containerBg 4px, green.50 4px, green.50 6px)"
              p={4}
            >
              <Flex direction="column" mr={4}>
                <Text fontWeight={900} fontSize="4xl">
                  {course}
                </Text>
                <Flex alignItems="center" mb={2}>
                  <Box
                    bg="black"
                    w="50px"
                    h="50px"
                    color="white"
                    fontWeight={900}
                    fontSize="3xl"
                    textAlign="center"
                    lineHeight="50px"
                    mr={2}
                  >
                    {betting.race}
                  </Box>
                  <Text fontWeight={900} fontSize="2xl" whiteSpace="nowrap">
                    レース
                  </Text>
                </Flex>
                <HStack spacing="10px" mb={2}>
                  <ImQrcode size="50px" />
                  <ImQrcode size="50px" />
                </HStack>
                <Text fontWeight={400} fontSize="md">
                  by {betting.user.name}
                </Text>
              </Flex>
              <VStack
                spacing="50px"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="gray.700"
                width="50px"
                justifyContent="center"
                p={2}
                mr={4}
              >
                <Text fontSize="3xl" color="gray.700" fontWeight={900}>
                  予
                </Text>
                <Text fontSize="3xl" color="gray.700" fontWeight={900}>
                  想
                </Text>
              </VStack>

              <VStack justifyContent="center">
                {betting.horse.map((bettingHorse) => (
                  <Flex
                    alignItems="center"
                    key={`betting-horse-${bettingHorse.id}`}
                  >
                    {bettingHorse.type === 'WIN' ? (
                      <Flex
                        w="30px"
                        h="30px"
                        borderStyle="solid"
                        borderColor="gray.800"
                        borderWidth="2px"
                        borderRadius="50%"
                        justifyContent="center"
                        alignItems="center"
                        mr={2}
                      >
                        <Box
                          w="20px"
                          h="20px"
                          borderStyle="solid"
                          borderColor="gray.800"
                          borderWidth="2px"
                          borderRadius="50%"
                        />
                      </Flex>
                    ) : (
                      <svg width="30" height="30" viewBox="0 0 250 250">
                        <polygon points="0,250 250,250 125,25" fill="#000" />
                      </svg>
                    )}
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
                      // borderWidth="2px"
                      borderColor="gray.700"
                    >
                      {bettingHorse.number}
                    </Box>
                  </Flex>
                ))}
              </VStack>
              <Grid
                templateColumns="repeat(10, 11px)"
                templateRows={`repeat(${30 / 10}, 18px)`}
              >
                {[...Array(betting.confidence)].map((v, i) => (
                  <AiFillStar key={`star=${i}`} size="12px" />
                ))}
              </Grid>
            </Flex>
            <Textarea
              borderColor="gray.700"
              bg="markCard.containerBg"
              borderWidth="1px"
              focusBorderColor="gray.700"
              resize="none"
              _hover={{
                borderColor: 'gray.700'
              }}
              isReadOnly
              mt={2}
              borderRadius="3px"
            >
              {betting.comment}
            </Textarea>
          </ModalBody>
          <ModalFooter pt={0} justifyContent="center">
            <Button
              onClick={onClose}
              bg="markCard.containerBg"
              borderColor="gray.300"
              color="gray.500"
              borderWidth="2px"
              _hover={{
                bg: 'markCard.containerBg'
              }}
              _focus={{
                bg: 'markCard.containerBg'
              }}
              _active={{
                bg: 'markCard.containerBg',
                transform: 'scale(0.98)'
              }}
            >
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BettingItem
