import { render, screen } from '@testing-library/react'
import { SignInButton } from '.'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react', () => ({ useSession: jest.fn() }))

describe('SignInButton Component', () => {
  it('renders correctly when user is not authenticated', () => {
    ;(
      useSession as jest.Mock<ReturnType<typeof useSession>>
    ).mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
      update: async () => null,
    })

    render(<SignInButton />)

    expect(screen.getByText('Sign In with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    ;(
      useSession as jest.Mock<ReturnType<typeof useSession>>
    ).mockReturnValueOnce({
      data: {
        user: { email: 'JohnDoe@email.com', name: 'John Doe' },
        expires: '12312312',
        activeSubscription: null,
      },
      status: 'authenticated',
      update: async () => null,
    })

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
