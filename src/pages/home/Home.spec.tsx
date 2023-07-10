import { render, screen } from '@testing-library/react'
import Home, { getStaticProps } from '.'
import { stripe } from '~/libs/stripe'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({
    data: null,
    status: 'unauthenticated',
    update: async () => null,
  }),
}))
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
jest.mock('~/libs/stripe')

const stripePricesRetrive = stripe.prices.retrieve
const stripePricesRetriveMock = jest.mocked(stripePricesRetrive)

describe('Home page', () => {
  it('Should render correctly', () => {
    const product = { priceId: 'price-id-fake', amount: '$19.00' }
    render(<Home product={product} />)

    expect(screen.getByText('for $19.00 month')).toBeInTheDocument()
  })

  it('should load initial data correctly', async () => {
    stripePricesRetriveMock.mockResolvedValueOnce({
      id: 'price-id-fake',
      unit_amount: 1900,
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: { product: { priceId: 'price-id-fake', amount: '$19.00' } },
      }),
    )
  })
})
