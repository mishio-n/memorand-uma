import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider as NextAuthProvider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '~/components/Header'

const theme = extendTheme({
  colors: {
    $white: {
      100: 'rgba(255,255,255,0.1)'
    },
    markCard: {
      bg: 'rgba(245, 250, 210, 1.0)',
      containerBorder: 'rgba(200,245,120,1.0)',
      containerBg: 'rgba(255,255,245,1.0)'
    }
  }
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>memorand-uma</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
