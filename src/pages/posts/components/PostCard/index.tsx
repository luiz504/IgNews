import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

type PostCardProps = {
  post: Post
}
export const PostCard: FC<PostCardProps> = ({ post }) => {
  const { data: session } = useSession()

  const isSubscritionActive = session?.activeSubscription

  const linkURL = isSubscritionActive
    ? `/posts/${post.slug}`
    : `/posts/preview/${post.slug}`

  return (
    <Link
      key={post.slug}
      href={linkURL}
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
  )
}
