import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

import { buttonStyle } from './styles'

export const SignInButton = () => {
  const { data: session } = useSession()

  const isUserLoggedIn = !!session?.user?.email

  const userName = session?.user?.name

  const handleSignOut = () => {
    signOut()
  }

  const handleSignIn = () => {
    signIn('github')
  }

  return (
    <>
      {isUserLoggedIn && (
        <button type="button" className={buttonStyle()} onClick={handleSignOut}>
          <FaGithub className={`h-6 w-6 text-green`} />

          <span className="font-bold">{userName}</span>

          <FiX className="h-5 w-5 text-gray--500 " />
        </button>
      )}

      {!isUserLoggedIn && (
        <button type="button" className={buttonStyle()} onClick={handleSignIn}>
          <FaGithub className={`h-6 w-6 text-yellow`} />
          <span className="font-bold">Sign In with Github</span>
        </button>
      )}
    </>
  )
}
