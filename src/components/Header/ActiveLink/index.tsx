import { ComponentProps, FC } from 'react'
import Link from 'next/link'

import { linkVariants } from './styles'
import { useRouter } from 'next/router'

interface ActiveLinkProps extends ComponentProps<typeof Link> {}

export const ActiveLink: FC<ActiveLinkProps> = ({
  children,
  className,
  ...rest
}) => {
  const { asPath } = useRouter()

  const active = asPath === rest.href

  return (
    <Link {...rest} className={linkVariants({ active, className })}>
      {children}
    </Link>
  )
}
