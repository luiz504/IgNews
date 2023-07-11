import { GetStaticProps } from 'next'

import { NextSeo } from 'next-seo'

import { createPrismicClient } from '~/libs/prismic'
import { formatDate } from '~/utils/dateFormat'
import { PostCard } from './components/PostCard'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}
export interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <NextSeo title="Home | ig.news" />

      <main className="max-w-[1120px] mx-auto px-8">
        <div className="max-w-[720px] mt-20 mx-0">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
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
