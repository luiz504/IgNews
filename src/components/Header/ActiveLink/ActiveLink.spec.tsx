import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'
import { variantActiveClasses, activeLinkVariants } from './styles'

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

describe('ActiveLink Styling', () => {
  it('should return the correct styles when not active', () => {
    const notActiveClassed = activeLinkVariants({ active: false })

    expect(notActiveClassed).toBe(
      'inline-block relative px-2 h-20 leading-[5rem] text-gray--300 transition-colors hover:text-white custom-focus-visible font-bold',
    )
  })
  it('should return the correct styles when active', () => {
    const notActiveClassed = activeLinkVariants({ active: true })

    expect(notActiveClassed).toBe(
      'inline-block relative px-2 h-20 leading-[5rem] text-gray--300 transition-colors hover:text-white custom-focus-visible font-bold after:content-[""] after:h-[3px] after:w-full after:rounded-t-sm after:absolute after:bottom-[3px] after:left-0 after:bg-yellow text-white font-bold',
    )
  })
})
