import { render, screen } from '@testing-library/react'
import Posts, { PostsProps, getStaticProps } from './index.page'
import { createPrismicClient } from '~/libs/prismic'

jest.mock('~/libs/prismic')
jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    },
  }
})

const createPrismicClientMocked = jest.mocked(createPrismicClient)

const posts: PostsProps['posts'] = [
  {
    slug: '/slug1',
    title: 'title post 1',
    excerpt: 'excerpt post 1',
    updatedAt: '10 de maio de 1992',
  },
  {
    slug: '/slug2',
    title: 'title post 2',
    excerpt: 'excerpt post 2',
    updatedAt: '15 de maio de 1992',
  },
]

describe('Posts page', () => {
  it('Should render correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText(posts[0].title)).toBeInTheDocument()
    expect(screen.getByText(posts[0].excerpt)).toBeInTheDocument()
    expect(screen.getByText(posts[0].updatedAt)).toBeInTheDocument()
    expect(screen.getByText(posts[1].title)).toBeInTheDocument()
    expect(screen.getByText(posts[1].excerpt)).toBeInTheDocument()
    expect(screen.getByText(posts[1].updatedAt)).toBeInTheDocument()
  })

  it('should load initial data correctly', async () => {
    const getallByTypeMock = jest.fn().mockResolvedValue([
      {
        uid: 'post-uid-1',
        data: {
          title: 'post 1 title',
          content: [
            { type: 'paragraph', text: 'Post content first paragraph' },
          ],
        },
        last_publication_date: '04-01-2042',
      },
    ] as any)

    createPrismicClientMocked.mockReturnValueOnce({
      getAllByType: getallByTypeMock,
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'post-uid-1',
              title: 'post 1 title',
              excerpt: 'Post content first paragraph',
              updatedAt: '01 de abril de 2042',
            },
          ],
        },
      }),
    )
  })
})
