import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'
import { RaceCourse } from '~/server/types'
import NormalMarkCard from './NormalMarkCard'

type BettingButtonProps = {
  courses: RaceCourse[]
  date: string
  fetcher: () => Promise<void>
}

const BettingButton: React.FC<BettingButtonProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        leftIcon={<MdAdd />}
        onClick={onOpen}
        _active={{ backgroundColor: '$white.100', transform: 'scale(0.95)' }}
        _focus={{ backgroundColor: '$white.100' }}
        mb={4}
      >
        予想を追加する
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody background="markCard.bg" borderRadius="5px 5px 0 0">
            <NormalMarkCard {...props} onClose={onClose} />
          </ModalBody>
          <ModalFooter
            py={0}
            bg="markCard.bg"
            borderRadius="0 0 5px 5px"
            justifyContent="center"
          >
            <HStack spacing={8}>
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
              <Box
                w="8px"
                h="15px"
                bg="rgba(0,12,28,1.0)"
                borderRadius="3px 3px 0 0"
              />
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BettingButton
