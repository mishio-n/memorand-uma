import NextDocument, {
  DocumentContext,
  Html,
  Head,
  NextScript,
  Main
} from 'next/document'

class MyDocument extends NextDocument {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await super.getInitialProps(context)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="ja">
        <Head title="Memorand Uma" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
