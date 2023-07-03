import { query as q } from 'faunadb'
import { fauna } from '~/libs/fauna'
import { stripe } from '~/libs/stripe'

type SaveSubscription = {
  subscriptionId: string
  customerId: string
  createAction?: boolean
}

export async function saveSubscription({
  subscriptionId,
  customerId,
  createAction = false,
}: SaveSubscription): Promise<void> {
  if (!subscriptionId || !customerId)
    throw new Error('SubscriptionId and customerId are required')

  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)),
    ),
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection('subscriptions'), { data: subscriptionData }),
    )
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId)),
        ),
        { data: subscriptionData },
      ),
    )
  }
}
