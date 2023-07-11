import { render, screen } from '@testing-library/react'
import Post, { getServerSideProps, PostProps } from './index.page'
import { createPrismicClient } from '~/libs/prismic'
import { getSession } from 'next-auth/react'

jest.mock('next-auth/react')
jest.mock('~/libs/prismic')

const post: PostProps['post'] = {
  slug: '/slug1',
  title: 'title post 1',
  content: '<p>content post 1</p>',
  updatedAt: '10 de maio de 1992',
}

describe('Posts page', () => {
  it('Should render correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(
      screen.getByText(post.content.replace(/<[^>]+>/g, '')),
    ).toBeInTheDocument()
    expect(screen.getByText(post.updatedAt)).toBeInTheDocument()
  })

  it('should redirect the user with no active subscription', async () => {
    jest
      .mocked(getSession)
      .mockResolvedValue({ activeSubscription: null } as any)

    const response = await getServerSideProps({} as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: { destination: '/', permanent: false },
      }),
    )
  })

  it('should load the initial data', async () => {
    jest
      .mocked(getSession)
      .mockResolvedValueOnce({ activeSubscription: true } as any)

    const paragraphText = 'Paragraph Text Content!'

    const getByUIDMocked = jest.fn().mockResolvedValueOnce({
      data: {
        title: 'Title post 1',
        content: [
          {
            type: 'paragraph',
            text: paragraphText,
            spans: [
              {
                start: 18,
                end: 36,
                type: 'em',
              },
            ],
          },
        ],
      },
      last_publication_date: '01-01-2023',
    })

    jest.mocked(createPrismicClient).mockReturnValueOnce({
      getByUID: getByUIDMocked,
    } as any)

    const response = await getServerSideProps({
      params: { slug: 'new-post-fake' },
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'new-post-fake',
            title: 'Title post 1',
            content: '<p>Paragraph Text Con<em>tent!</em></p>',
            updatedAt: '01 de janeiro de 2023',
          },
        },
      }),
    )
  })
})
