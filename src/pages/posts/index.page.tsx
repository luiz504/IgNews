import { NextSeo } from 'next-seo'
import Link from 'next/link'

export default function Posts() {
  const posts = [...new Array(5)].map((_, i) => ({ id: i }))

  return (
    <>
      <NextSeo title="Home | ig.news" />

      <main className="max-w-[1120px] mx-auto px-8">
        <div className="max-w-[720px] mt-20 mx-0">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className={`group block [&:not(:first-child)]:mt-8 [&:not(:first-child)]:pt-8 [&:not(:first-child)]:border-t-2 [&:not(:first-child)]:border-gray-700`}
            >
              <time className="text-base leading-[1.625rem] flex items-center text-gray--300">
                12 de março de 2021
              </time>

              <strong className="block text-2xl leading-[34px] text-white mt-4 group-hover:text-yellow transition-colors">
                Creating a Monorepo with Lerna & Yarn Workspaces
              </strong>

              <p className="mt-2 text-gray--300 text-base leading-[1.625rem]">
                In this guide, you will learn how to create a Monorepo to manage
                multiple packages with a shared build, test, and release
                process.
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
