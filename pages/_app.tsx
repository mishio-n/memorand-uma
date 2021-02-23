import { ChakraProvider } from '@chakra-ui/react'
import { Provider as NextAuthProvider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '~/components/Header'
import { theme } from '~/utils/theme'

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
