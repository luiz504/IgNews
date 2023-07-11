import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { createPrismicClient } from '~/libs/prismic'
import { queryParamToString } from '~/utils/queryParamToString'
import { asHTML } from '@prismicio/helpers'
import { formatDate } from '~/utils/dateFormat'
import { NextSeo } from 'next-seo'

import s from './styles.module.css'

type PostType = {
  slug: string
  title: string
  content: string
  updatedAt: string
}

export interface PostProps {
  post: PostType
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <NextSeo title={`${post.title} | ig.news`} noindex />

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
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req })

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const slug = queryParamToString(params?.slug)

  const prismic = createPrismicClient()

  const post = await prismic.getByUID('post', slug)

  const item: PostType = {
    slug,
    title: post.data.title as string,
    content: asHTML(post.data.content),
    updatedAt: formatDate(post.last_publication_date),
  }

  return {
    props: {
      post: item,
    },
  }
}
