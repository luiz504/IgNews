import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface SubscribeButtonProsp extends HTMLAttributes<HTMLButtonElement> {
  priceId: string
}
export const SubscribeButton: FC<SubscribeButtonProsp> = ({
  className,
  priceId,
  ...rest
}) => {
  return (
    <button
      type="button"
      {...rest}
      className={twMerge(
        'flex items-center justify-center text-xl leading-6 font-bold text-gray--900 bg-yellow rounded-full px-16 py-5 hover:brightness-90 transition custom-focus-visible',
        className,
      )}
    >
      Subscribe Now
    </button>
  )
}
