import { render, screen } from '@testing-library/react'
import { PostCard } from '.'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react')

const post = {
  slug: '/slug1',
  title: 'title post 1',
  excerpt: 'excerpt post 1',
  updatedAt: '10 de maio de 1992',
}

describe('Post Card Component', () => {
  it('should render the card with the preview href ', () => {
    jest
      .mocked(useSession)
      .mockReturnValue({ data: null, status: 'unauthenticated' } as any)

    render(<PostCard post={post} />)

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/posts/preview/${post.slug}`,
    )

    expect(
      screen.getByText(
        (content, element) =>
          content === post.updatedAt &&
          element?.tagName.toLocaleLowerCase() === 'time',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(screen.getByText(post.excerpt)).toBeInTheDocument()
  })

  it('should render the card with the post href ', () => {
    jest.mocked(useSession).mockReturnValue({
      data: { activeSubscription: true },
      status: 'authenticated',
    } as any)

    render(<PostCard post={post} />)

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/posts/${post.slug}`,
    )

    expect(
      screen.getByText(
        (content, element) =>
          content === post.updatedAt &&
          element?.tagName.toLocaleLowerCase() === 'time',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(screen.getByText(post.excerpt)).toBeInTheDocument()
  })
})
