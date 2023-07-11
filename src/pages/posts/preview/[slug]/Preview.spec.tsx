import { render, screen } from '@testing-library/react'
import PostPreview, {
  getStaticProps,
  getStaticPaths,
  PostPreviewProps,
} from './index.page'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { createPrismicClient } from '~/libs/prismic'
import { RichTextField } from '@prismicio/client'
import { asHTML } from '@prismicio/helpers'

jest.mock('next-auth/react')
jest.mock('next/router', () => ({ useRouter: jest.fn() }))

const post: PostPreviewProps['post'] = {
  slug: '/slug1',
  title: 'title post 1',
  content: '<p>content post 1</p>',
  updatedAt: '10 de maio de 1992',
}

describe('Posts Preview page', () => {
  it('Should render correctly when user has no active subscription', () => {
    jest
      .mocked(useSession)
      .mockReturnValueOnce({ data: { activeSubscription: false } } as any)

    const pushMocked = jest.fn()
    jest.mocked(useRouter).mockReturnValueOnce({ push: pushMocked } as any)

    render(<PostPreview post={post} />)

    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(
      screen.getByText(post.content.replace(/<[^>]+>/g, '')),
    ).toBeInTheDocument()
    expect(screen.getByText(post.updatedAt)).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    expect(pushMocked).not.toHaveBeenLastCalledWith(`/posts/${post.slug}`)
  })

  it('Should redirect the user if he has active subscription', () => {
    jest
      .mocked(useSession)
      .mockReturnValueOnce({ data: { activeSubscription: true } } as any)

    const pushMocked = jest.fn()
    jest.mocked(useRouter).mockReturnValueOnce({ push: pushMocked } as any)

    render(<PostPreview post={post} />)

    expect(pushMocked).toHaveBeenLastCalledWith(`/posts/${post.slug}`)
  })
})

jest.mock('~/libs/prismic')

describe('PostPreview Page server functions', () => {
  it('should load the initial data with partial content', async () => {
    const contentComplete = [
      {
        type: 'paragraph',
        text: 'Paragraph Content 1',
        spans: [
          {
            start: 79,
            end: 127,
            type: 'strong',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Paragraph Content 2',
        spans: [],
      },
      {
        type: 'paragraph',
        text: 'Paragraph Content 3',
        spans: [],
      },
      {
        type: 'paragraph',
        text: 'Paragraph Content 4',
        spans: [],
      },
      {
        type: 'paragraph',
        text: 'Paragraph Content 5',
        spans: [],
      },
    ]

    const getByUIDMocked = jest.fn().mockResolvedValueOnce({
      data: {
        title: 'Title post 1',
        content: [...contentComplete],
      },
      last_publication_date: '01-01-2023',
    })

    jest.mocked(createPrismicClient).mockReturnValueOnce({
      getByUID: getByUIDMocked,
    } as any)

    const response = await getStaticProps({ params: { slug: 'new-post-fake' } })

    const partialContent = asHTML(
      [...contentComplete].splice(0, 3) as RichTextField,
    )

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'new-post-fake',
            title: 'Title post 1',
            content: partialContent,

            updatedAt: '01 de janeiro de 2023',
          },
        },
      }),
    )
  })

  it('should not build any post on the server build/deploy process', async () => {
    const response = await getStaticPaths({})

    expect(response).toEqual({ paths: [], fallback: 'blocking' })
  })
})
