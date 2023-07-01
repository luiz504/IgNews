import { twMerge } from 'tailwind-merge'

export const buttonStyle = (className?: string) =>
  twMerge(
    [
      'flex items-center px-5 py-3 rounded-full gap-3 bg-cyan--900 text-white hover:brightness-90 transition custom-focus-visible',
    ],
    className,
  )
