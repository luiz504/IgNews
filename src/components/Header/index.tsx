import Image from 'next/image'

import { SignInButton } from './SignInButton'
import { ActiveLink } from './ActiveLink'

export const Header = () => {
  return (
    <header className="border-b-[1px] h-20 border-gray--800 pt-1">
      <div className="max-w-[1120px] h-full mx-auto flex items-center px-8 [&>button]:ml-auto">
        <Image
          src="/images/logo.svg"
          height={30}
          width={108}
          alt="Ig.news Logo"
        />
        <nav className="h-full ml-20 flex gap-8">
          <ActiveLink href={'/'}>Home</ActiveLink>

          <ActiveLink href={'/posts'}>Posts</ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
