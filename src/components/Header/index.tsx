import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { NavItem } from './styles'
import { SignInButton } from './SignInButton'

export const Header: FC = () => {
  const router = useRouter()

  return (
    <header className="border-b-[1px] border-gray--800 pt-1">
      <div className="max-w-[1120px] h-20 mx-auto flex items-center px-8 [&>button]:ml-auto">
        <Image
          src="/images/logo.svg"
          height={30}
          width={108}
          alt="Ig.news Logo"
        />
        <nav className="h-20 ml-20 flex gap-8">
          <NavItem active={router.pathname === '/'} href={'/'}>
            Home
          </NavItem>

          <NavItem
            active={router.pathname.startsWith('/posts')}
            href={'/posts'}
          >
            Posts
          </NavItem>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
