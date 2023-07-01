import Stripe from 'stripe'
import pkgJson from '~/../package.json'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignews',
    version: pkgJson.version,
  },
})
