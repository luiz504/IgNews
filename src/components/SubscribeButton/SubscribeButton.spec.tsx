import { fireEvent, render, screen } from '@testing-library/react'
import { SubscribeButton } from '.'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const useSessionMocked = jest.mocked(useSession)
const useRouterMocked = jest.mocked(useRouter)

describe('SubscribeButton Component', () => {
  it('should render the button correctly', () => {
    useSessionMocked.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: async () => null,
    })

    render(<SubscribeButton priceId={'12312'} />)

    const element = screen.getByText('Subscribe Now')
    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('type', 'button')
  })

  it('should redirect the user to the SignIn provider page when not authenticated', () => {
    useSessionMocked.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: async () => null,
    })
    const signInMocked = signIn as jest.Mock

    render(<SubscribeButton priceId={'12312'} />)

    const btnElement = screen.getByRole('button')

    fireEvent.click(btnElement)

    expect(signInMocked).toHaveBeenCalledWith('github')
  })

  it('should redirect the user to /posts when user already has an active subscrition', () => {
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: 'John Doe', email: 'JohnDoe@email.com' },
        expires: '12312',
        activeSubscription: true,
      },
      status: 'authenticated',
      update: async () => null,
    })

    const mockedPush = jest.fn()

    useRouterMocked.mockReturnValue({
      push: mockedPush,
    } as any)

    render(<SubscribeButton priceId={'12312'} />)

    const btnElement = screen.getByRole('button')

    fireEvent.click(btnElement)

    expect(mockedPush).toHaveBeenCalledWith('/posts')
  })
})
