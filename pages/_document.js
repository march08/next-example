import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      lang: ctx.req.acceptsLanguages()[0],
    }
  }

  render() {
    const { lang } = this.props
    return (
      <html lang={ lang }>
        <Head>
          <style>{'body { margin: 0 } /* custom! */'}</style>
          <meta
            content="width=device-width, initial-scale=1"
            name="viewport"
          />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
