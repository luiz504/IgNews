import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, HTMLAttributes, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { api } from '~/libs/axios'

import {
  PostSubscriptionBody,
  PostSubscriptionResponse,
} from '~/pages/api/checkout/post/index.api'

interface SubscribeButtonProsp extends HTMLAttributes<HTMLButtonElement> {
  priceId: string
}
export const SubscribeButton: FC<SubscribeButtonProsp> = ({
  className,
  priceId,
  ...rest
}) => {
  const router = useRouter()

  const { data: session } = useSession()
  const isLoggedIn = session?.user?.email
  const isUserSubscribed = session?.activeSubscription

  const [subscribingOrloggingIn, setSubscribingOrloggingIn] = useState(false)

  const handleSubscribe = async () => {
    setSubscribingOrloggingIn(true)
    if (!isLoggedIn) {
      await signIn('github')
      return
    }

    if (isUserSubscribed) {
      await router.push('/posts')
      return
    }

    const body: PostSubscriptionBody = {
      priceId,
    }
    try {
      const { data } = await api.post<PostSubscriptionResponse>(
        '/checkout/post',
        body,
      )

      window.location.href = data.checkoutURL
    } catch (err) {
      alert('Fail to Checkout')
    }
    setSubscribingOrloggingIn(false)
  }

  return (
    <button
      type="button"
      {...rest}
      className={twMerge(
        'flex items-center justify-center text-xl leading-6 font-bold text-gray--900 bg-yellow rounded-full px-16 py-5 hover:brightness-90 transition custom-focus-visibl disabled:cursor-not-allowed disabled:data-[waiting=true]:cursor-progress',
        className,
      )}
      data-waiting={subscribingOrloggingIn}
      disabled={subscribingOrloggingIn}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  )
}
