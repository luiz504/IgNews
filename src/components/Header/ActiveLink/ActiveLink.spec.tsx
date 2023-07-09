import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'
import { variantActiveClasses } from './styles'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      }
    },
  }
})

describe('ActiveLink Component', () => {
  it('renders correctly the link label', () => {
    render(<ActiveLink href="/"> Link Label </ActiveLink>)

    expect(screen.getByText('Link Label')).toBeInTheDocument()
  })

  it('renders correctly the link href', () => {
    const href = '/path'
    render(<ActiveLink href={href}> Link Label </ActiveLink>)

    expect(screen.getByText('Link Label')).toHaveAttribute('href', href)
  })

  it('should receive the classes from the active variant when the link is active', () => {
    render(<ActiveLink href="/"> Link Label </ActiveLink>)

    expect(screen.getByText('Link Label')).toHaveClass(variantActiveClasses)
  })

  it('should not receive the classes from the active variant when the link is not active', () => {
    render(<ActiveLink href="/home"> Link Label </ActiveLink>)

    expect(screen.getByText('Link Label')).not.toHaveClass(variantActiveClasses)
  })
})
