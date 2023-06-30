import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import { ComponentProps, FC } from 'react'
import { twMerge } from 'tailwind-merge'

const navItemVariants = cva(
  [
    'inline-block relative px-2 h-20 leading-[5rem] text-gray--300 transition-colors hover:text-white custom-focus-visible',
  ],
  {
    variants: {
      active: {
        true: [
          'after:content-[""] after:h-[3px] after:w-full after:rounded-t-sm after:absolute after:bottom-[3px] after:left-0 after:bg-yellow',
          'text-white font-bold',
        ],
      },
    },
  },
)

export interface NavItemVariants extends VariantProps<typeof navItemVariants> {
  className?: string
}

export const navItem = ({ active, className }: NavItemVariants) =>
  twMerge(navItemVariants({ active, className }))

interface NavItemProps extends ComponentProps<typeof Link> {
  active?: boolean
}

export const NavItem: FC<NavItemProps> = ({
  children,
  active = false,
  className,
  ...props
}) => {
  return (
    <Link {...props} className={navItem({ active, className })}>
      {children}
    </Link>
  )
}
