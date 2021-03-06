import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'
import { BettingData } from '~/server/types'
import BetTicket from './BetTicket'

type BettingItemProps = {
  betting: BettingData
  course: string
}

const BettingItem: React.FC<BettingItemProps> = ({ betting, course }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box
        w={betting.confidence >= 10 ? '50px' : '25px'}
        h={betting.confidence >= 10 ? '50px' : '25px'}
      >
        {betting.user.image ? (
          <Box
            backgroundImage={`url(${betting.user.image})`}
            backgroundPosition="center"
            backgroundSize="cover"
            borderRadius="50%"
            w={betting.confidence >= 10 ? '50px' : '25px'}
            h={betting.confidence >= 10 ? '50px' : '25px'}
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
            <BetTicket betting={betting} course={course} />
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
