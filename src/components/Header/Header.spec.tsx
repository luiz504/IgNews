import { render, screen } from '@testing-library/react'
import { Header } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      }
    },
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    },
  }
})

describe('Header Component', () => {
  it('renders correctly the Header', () => {
    render(<Header />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByAltText('Ig.news Logo')).toBeInTheDocument()
    expect(screen.getByText('Sign In with Github')).toBeInTheDocument()
  })
})
