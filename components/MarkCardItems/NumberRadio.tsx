import { Box, Flex, useRadio, UseRadioProps } from '@chakra-ui/react'

type NumberRadioProps = UseRadioProps & {
  disabled: boolean
}

export const NumberRadio: React.FC<NumberRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" pb={2}>
      <input {...input} />
      <Flex
        key={`number-${props.children}`}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <svg width="10px" height="5px">
          <path
            d="M 1 4 C 1 0, 9, 0, 9 4"
            stroke={props.disabled ? 'rgb(180,180,200)' : 'rgb(250,125,40)'}
            fill="transparent"
            strokeWidth="2px"
          />
        </svg>
        <Box
          textAlign="center"
          color={props.disabled ? 'rgb(180,180,200)' : 'rgb(250,125,40)'}
          fontWeight={700}
          position="relative"
        >
          {props.children}
          <Box
            {...checkbox}
            position="absolute"
            m="auto"
            top={0}
            bottom={0}
            right={0}
            left={0}
            _checked={{
              w: '10px',
              h: '20px',
              bg: 'gray.700',
              borderRadius: '10px',
              backgroundSize: '10px'
            }}
          />
        </Box>
        <svg width="10px" height="5px">
          <path
            d="M 1 0 C 1 4, 9, 4, 9 0"
            stroke={props.disabled ? 'rgb(180,180,200)' : 'rgb(250,125,40)'}
            fill="transparent"
            strokeWidth="2px"
          />
        </svg>
      </Flex>
    </Box>
  )
}
