import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export const variantActiveClasses =
  'after:content-[""] after:h-[3px] after:w-full after:rounded-t-sm after:absolute after:bottom-[3px] after:left-0 after:bg-yellow text-white font-bold'

export const activeLinkVariants = cva(
  [
    'inline-block relative px-2 h-20 leading-[5rem] text-gray--300 transition-colors hover:text-white custom-focus-visible font-bold',
  ],
  {
    variants: {
      active: {
        true: [variantActiveClasses],
      },
    },
  },
)

export interface LinkVariants extends VariantProps<typeof activeLinkVariants> {
  className?: string
}

export const linkVariants = ({ active, className }: LinkVariants) =>
  twMerge(activeLinkVariants({ active }), className)
