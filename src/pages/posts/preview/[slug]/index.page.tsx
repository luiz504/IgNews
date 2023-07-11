import { GetStaticPaths, GetStaticProps } from 'next'

import { createPrismicClient } from '~/libs/prismic'
import { queryParamToString } from '~/utils/queryParamToString'
import { asHTML } from '@prismicio/helpers'
import { formatDate } from '~/utils/dateFormat'
import { NextSeo } from 'next-seo'

import s from '../../[slug]/styles.module.css'

import { RichTextField } from '@prismicio/client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type PostType = {
  slug: string
  title: string
  content: string
  updatedAt: string
}

export interface PostPreviewProps {
  post: PostType
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession()
  const isUserSubscribed = session?.activeSubscription

  const router = useRouter()

  useEffect(() => {
    if (isUserSubscribed) {
      router.push(`/posts/${post.slug}`)
    }
  }, [isUserSubscribed, router, post.slug])

  return (
    <>
      <NextSeo title={`${post.title} | ig.news`} />

      <main className="max-w-[1120px] mx-auto px-8">
        <article className="max-w-[720px] mt-20 mx-auto">
          <h1 className="text-[3.5rem] font-black leading-[1.1]">
            {post.title}
          </h1>
          <time className="block text-base text-gray--300 mt-6">
            {post.updatedAt}
          </time>

          <div
            className={`${s.postContent} my-8`}
            data-preview={true}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="p-8 text-center bg-gray--700 rounded-full text-xl font-bold mt-16 mb-8">
            Wanna continue reading?
            <Link className="text-yellow ml-2 group" href={'/'}>
              <span className="group-hover:underline">Subscribe now</span> 🤗
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = queryParamToString(params?.slug) || ''

  const prismic = createPrismicClient()

  const post = await prismic.getByUID('post', slug)

  const item: PostType = {
    slug,
    title: post.data.title as string,
    content: asHTML(post.data.content.splice(0, 3) as RichTextField),
    updatedAt: formatDate(post.last_publication_date),
  }

  return {
    props: {
      post: item,
    },
    revalidate: 60 * 30, // 30 minutes
  }
}
