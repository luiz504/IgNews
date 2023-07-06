import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { createPrismicClient } from '~/libs/prismic'
import { formatDate } from '~/utils/dateFormat'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}
interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <NextSeo title="Home | ig.news" />

      <main className="max-w-[1120px] mx-auto px-8">
        <div className="max-w-[720px] mt-20 mx-0">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className={`group block [&:not(:first-child)]:mt-8 [&:not(:first-child)]:pt-8 [&:not(:first-child)]:border-t-2 [&:not(:first-child)]:border-gray-700`}
            >
              <time className="text-base leading-[1.625rem] flex items-center text-gray--300">
                {post.updatedAt}
              </time>

              <strong className="block text-2xl leading-[34px] text-white mt-4 group-hover:text-yellow transition-colors">
                {post.title}
              </strong>

              <p className="mt-2 text-gray--300 text-base leading-[1.625rem]">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createPrismicClient()

  const response = await prismic.getAllByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  })

  const posts = response.map((post) => {
    const firstParagraph = post.data.content.find(
      (content) => content.type === 'paragraph',
    )
    const excerpt =
      firstParagraph?.type === 'paragraph' ? firstParagraph.text : ''

    const item: Post = {
      slug: post.uid,
      title: post.data.title as string,
      excerpt,
      updatedAt: formatDate(post.last_publication_date),
    }

    return item
  })

  return {
    props: {
      posts,
    },
  }
}
