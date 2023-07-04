import { twMerge } from 'tailwind-merge'

export function twSelectorReplicator(selector: string, classValue: string) {
  return twMerge(
    '',
    classValue
      .split(' ')
      .map((clv) => `${selector}${clv}`)
      .join(' '),
  )
}

/** @function tailwind Selector Replicator */
export const twSR = twSelectorReplicator
