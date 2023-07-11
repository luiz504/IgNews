import { fireEvent, render, screen } from '@testing-library/react'
import { SignInButton } from '.'
import { signIn, signOut, useSession } from 'next-auth/react'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

const useSessionMocked = jest.mocked(useSession)

describe('SignInButton Component', () => {
  it('renders correctly when user is not authenticated', () => {
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
      update: async () => null,
    })

    render(<SignInButton />)

    expect(screen.getByText('Sign In with Github')).toBeInTheDocument()
  })

  it('should trigger signIn function when user click on sign in button', () => {
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
      update: async () => null,
    })

    const signInMocked = jest.mocked(signIn)

    render(<SignInButton />)
    const element = screen.getByText('Sign In with Github')

    fireEvent.click(element)

    expect(signInMocked).toBeCalledWith('github')
  })

  it('renders correctly when user is authenticated', () => {
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { email: 'JohnDoe@email.com', name: 'John Doe' },
        expires: '12312312',
        activeSubscription: null,
      },
      status: 'authenticated',
    } as any)

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should trigger signOut function when user click on sign out button', () => {
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { email: 'JohnDoe@email.com', name: 'John Doe' },
        expires: '12312312',
        activeSubscription: null,
      },
      status: 'authenticated',
    } as any)

    const signOutMocked = jest.mocked(signOut)

    render(<SignInButton />)
    const element = screen.getByText('John Doe')

    fireEvent.click(element)

    expect(signOutMocked).toHaveBeenCalledWith()
  })
})
