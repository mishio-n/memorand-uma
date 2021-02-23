import { Box, Flex, useRadio, UseRadioProps } from '@chakra-ui/react'

type NormalRadioProps = UseRadioProps

export const NormalRadio: React.FC<NormalRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Flex
        key={`course-number-${props.children}`}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box textAlign="center" w="10px" fontSize="xs" fontWeight="900">
          {props.children}
        </Box>

        <Box
          w="10px"
          h="30px"
          borderRadius="10px"
          borderColor="rgb(250,125,40)"
          borderWidth="2px"
          {...checkbox}
          _checked={{
            bg: 'gray.700',
            borderColor: 'rgb(250,125,40)'
          }}
        />
      </Flex>
    </Box>
  )
}
