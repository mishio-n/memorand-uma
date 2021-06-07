import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Text,
  MenuItem
} from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { FaUserCircle } from 'react-icons/fa'

const UserBanner = () => {
  const [session] = useSession()

  return (
    <div>
      {!session && (
        <>
          <Button
            onClick={() => signIn()}
            variant="ghost"
            _active={{
              backgroundColor: '$white.100',
              transform: 'scale(0.95)'
            }}
            _focus={{ backgroundColor: '$white.100' }}
            _hover={{ backgroundColor: '$white.100' }}
          >
            Sign In
          </Button>
        </>
      )}
      {session && (
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={
              session.user?.image ? (
                <Box
                  backgroundImage={`url(${session.user.image})`}
                  w="32px"
                  h="32px"
                  backgroundPosition="center"
                  backgroundSize="cover"
                  borderRadius="50%"
                />
              ) : (
                <FaUserCircle />
              )
            }
            _active={{
              backgroundColor: '$white.100',
              transform: 'scale(0.95)'
            }}
            _focus={{ backgroundColor: '$white.100' }}
            _hover={{ backgroundColor: '$white.100' }}
            variant="ghost"
          >
            <Text>{session.user?.name}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => signOut()}>
              <Text color="gray.700">Sign Out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </div>
  )
}

export default UserBanner
