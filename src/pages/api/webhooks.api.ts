import { NextApiHandler } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { stripe } from '~/libs/stripe'
import { nextApiBuilder } from '~/utils/apiHandlerUtils'
import { saveSubscription } from './_lib/manageSubscription'

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export const webHooksListerner: NextApiHandler = async (req, res) => {
  const secret = req.headers['stripe-signature']
  const buf = await buffer(req)

  let event: Stripe.Event

  try {
    if (!secret) throw new Error('secret required')
    event = stripe.webhooks.constructEvent(
      buf,
      secret,
      process.env.STRIPE_WEBHOOK_SECRET_KEY,
    )
  } catch (err: any) {
    return res.status(400).send(`Webhook error: ${err?.message}`)
  }

  const { type } = event
  if (relevantEvents.has(type)) {
    try {
      switch (type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription

          const subscriptionId = subscription.id
          const customerId = subscription.customer.toString()

          if (!subscriptionId || !customerId)
            throw new Error(
              'Event "checkout.session.completed" did not received required data',
            )

          await saveSubscription({
            subscriptionId,
            customerId,
          })

          break
        }
        case 'checkout.session.completed': {
          const checkoutSession = event.data.object as Stripe.Checkout.Session
          const subscriptionId = checkoutSession.subscription?.toString()
          const customerId = checkoutSession.customer?.toString()

          if (!subscriptionId || !customerId)
            throw new Error(
              'Event "checkout.session.completed" did not received required data',
            )

          await saveSubscription({
            subscriptionId,
            customerId,
            createAction: true,
          })
          break
        }

        default:
          throw new Error('Unhandled event')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : undefined
      return res.json({ error: 'Webhook handler failed.', errorMessage })
    }
  }

  res.status(200).json({ received: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default nextApiBuilder('POST')(webHooksListerner)
