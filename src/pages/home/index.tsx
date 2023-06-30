import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { SubscribeButton } from '~/components/SubscribeButton'

export default function Home() {
  return (
    <>
      <NextSeo title="Home | ig.news" />

      <main className="max-w-[1120px] mx-auto px-8 py-2  min-h-[calc(100svh-5rem)] flex items-center justify-between">
        <section className="max-w-[550px] [&>button]:mt-10 ">
          <span className="text-2xl font-bold">👏, hei welcome</span>
          <h1 className="text-7xl font-black mt-10">
            News about the <span className="text-cyan">React</span> world.
          </h1>
          <p className="text-2xl leading-9 mt-6">
            Get access to all the publications <br />
            <span className="text-cyan font-bold">for $9.90 month</span>
          </p>

          <SubscribeButton />
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
