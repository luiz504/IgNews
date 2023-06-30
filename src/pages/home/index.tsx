import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { SubscribeButton } from '~/components/SubscribeButton'
import { stripe } from '~/libs/stripe'

interface HomeProps {
  product: { priceId: string; amount: string }
}

export default function Home({ product }: HomeProps) {
  const { amount, priceId } = product
  return (
    <>
      <NextSeo title="Home | ig.news" />

      <main className="max-w-[1120px] mx-auto px-8 py-2  min-h-[calc(100svh-5rem)] flex items-center justify-between">
        <section className="max-w-[550px] [&>button]:mt-10 ">
          <span className="text-2xl font-bold">👏 Hey, welcome</span>
          <h1 className="text-7xl font-black mt-10">
            News about the <span className="text-cyan">React</span> world.
          </h1>
          <p className="text-2xl leading-9 mt-6">
            Get access to all the publications <br />
            <span className="text-cyan font-bold">for {amount} month</span>
          </p>

          <SubscribeButton priceId={priceId} />
        </section>

        <div className="relative ">
          <Image
            src="/images/avatar.svg"
            className="object-contain max-h-full"
            height={520}
            width={334}
            alt="Girl coding"
          />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const price = await stripe.prices.retrieve('price_1NOncCG2TPja3xogk2YWkys0')
    const unitAmount = price.unit_amount

    if (!unitAmount) throw new Error('unitAmount not proovided')

    const product = {
      priceId: price.id,
      amount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(unitAmount / 100),
    }

    const props: HomeProps = {
      product,
    }

    return {
      props,
      revalidate: 60 * 60 * 24, // 24 hours
    }
  } catch (err) {
    return { redirect: '/error', props: {} }
  }
}
