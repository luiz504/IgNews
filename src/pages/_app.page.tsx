/* eslint-disable react/no-unknown-property */
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { DefaultSeo } from 'next-seo'

import '~/styles/global.css'

import { Header } from '~/components/Header'
import Head from 'next/head'

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin-ext', 'latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style global jsx>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

      <DefaultSeo
        title="Ig News"
        description="Ig News is a dynamic newsletter platform that keeps you informed about the latest news and trends. Stay up-to-date with our curated articles, insights, and analysis from various industries. Join our community and never miss a beat in the world of news"
      />
      <Header />
      <Component {...pageProps} />
    </>
  )
}
