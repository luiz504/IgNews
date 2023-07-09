import { render } from '@testing-library/react'
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
    const { getByText } = render(<ActiveLink href="/"> Link Label </ActiveLink>)

    expect(getByText('Link Label')).toBeInTheDocument()
  })

  it('renders correctly the link href', () => {
    const href = '/path'
    const { getByText } = render(
      <ActiveLink href={href}> Link Label </ActiveLink>,
    )

    expect(getByText('Link Label')).toHaveAttribute('href', href)
  })

  it('should receive the classes from the active variant when the link is active', () => {
    const { getByText } = render(<ActiveLink href="/"> Link Label </ActiveLink>)

    expect(getByText('Link Label')).toHaveClass(variantActiveClasses)
  })

  it('should not receive the classes from the active variant when the link is not active', () => {
    const { getByText } = render(
      <ActiveLink href="/home"> Link Label </ActiveLink>,
    )

    expect(getByText('Link Label')).not.toHaveClass(variantActiveClasses)
  })
})
