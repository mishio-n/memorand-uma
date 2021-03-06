import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    $white: {
      100: 'rgba(255,255,255,0.1)'
    },
    markCard: {
      green: {
        bg: 'rgba(245, 250, 210, 1.0)',
        container: {
          border: 'rgba(200,245,120,1.0)',
          bg: 'rgba(255,255,245,1.0)'
        },
        label: 'rgba(0, 12, 28, 1.0)',
        barcode: 'rgba(0,12,28,1.0)'
      },
      red: {
        bg: 'rgba(255, 250, 230, 1.0)',
        container: {
          border: 'rgba(245,210,180,1.0)',
          bg: 'rgba(255,255,245,1.0)'
        },
        label: 'rgba(190, 40, 60, 1.0)',
        barcode: 'rgba(165,30,20,1.0)'
      },
      blue: {
        bg: 'rgba(235, 250, 240, 1.0)',
        container: {
          border: 'rgba(215,245,240,1.0)',
          bg: 'rgba(255,255,245,1.0)'
        },
        label: 'rgba(0, 25, 125, 1.0)',
        barcode: 'rgba(30,10,1,1.0)'
      }
    }
  }
  // breakpoints: {}
})
