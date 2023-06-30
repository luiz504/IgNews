import { FC, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export const SignInButton: FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  return isUserLoggedIn ? (
    <button
      type="button"
      className="flex items-center px-6 py-3 rounded-full gap-3 bg-cyan--900 text-white hover:brightness-90 transition custom-focus-visible"
      onClick={() => setIsUserLoggedIn(false)}
    >
      <FaGithub className={`h-6 w-6 text-green`} />
      <span className="font-bold">Luiz Bueno</span>
      <FiX className="h-5 w-5 text-gray--500 " />
    </button>
  ) : (
    <button
      type="button"
      className="flex items-center px-6 py-3 rounded-full gap-3 bg-cyan--900 text-white hover:brightness-90 transition custom-focus-visible"
      onClick={() => setIsUserLoggedIn(true)}
    >
      <FaGithub className={`h-6 w-6 text-yellow`} />
      <span className="font-bold">Sign In with Github</span>
    </button>
  )
}
