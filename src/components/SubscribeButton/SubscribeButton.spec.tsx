import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SubscribeButton } from '.'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '~/libs/axios'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('~/libs/axios')

const useSessionMocked = jest.mocked(useSession)
const useRouterMocked = jest.mocked(useRouter)
const apiMocked = jest.mocked(api.post)

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

  it('should request a subscription checkout link and redirect the user', async () => {
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: 'John Doe', email: 'john@example.com' },
        expires: '12312312',
        activeSubscription: null,
      },
      status: 'authenticated',
    } as any)

    const mockSubscriptionResponse = {
      checkoutURL: 'https://stripe.com/checkout/xyz',
    }

    const priceId = 'price-123'

    apiMocked.mockResolvedValue({
      data: mockSubscriptionResponse,
    })

    // Create a mock for window.location.href assignment
    const mockWindowLocationHrefAssign = jest.fn()
    // @ts-ignore
    delete window.location
    window.location = { href: '' } as Location
    Object.defineProperty(window.location, 'href', {
      set: mockWindowLocationHrefAssign,
    } as any)

    render(<SubscribeButton priceId={priceId} />)
    const subscribeButton = screen.getByText('Subscribe Now')

    fireEvent.click(subscribeButton)
    expect(apiMocked).toBeCalledWith('/checkout/post', { priceId })

    await waitFor(() => {
      expect(mockWindowLocationHrefAssign).toHaveBeenCalledWith(
        mockSubscriptionResponse.checkoutURL,
      )
    })
  })

  it('should trigger and error Alert when the subscription checkout request fails', async () => {
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: 'John Doe', email: 'john@example.com' },
        expires: '12312312',
        activeSubscription: null,
      },
      status: 'authenticated',
    } as any)

    const priceId = 'price-123'

    apiMocked.mockRejectedValueOnce(() => {})
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})

    render(<SubscribeButton priceId={priceId} />)
    const subscribeButton = screen.getByText('Subscribe Now')

    fireEvent.click(subscribeButton)
    expect(apiMocked).toBeCalledWith('/checkout/post', { priceId })

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Fail to Checkout')
    })
  })
})
