import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { stripe } from '~/libs/stripe'

import { nextApiBuilder, NextAPIResponseError } from '~/utils/apiHandlerUtils'
import { authOptions } from '../../auth/[...nextauth].api'
import { fauna } from '~/libs/fauna'
import { query as q } from 'faunadb'

export type PostSubscriptionResponse = {
  sessionId: string
  checkoutURL: string
}

const postSubscriptionBodySchema = z.object({
  priceId: z.string({
    invalid_type_error: 'priceId should be of type "string".',
    required_error: 'priceId  is a required parameter.',
  }),
})

export type PostSubscriptionBody = z.infer<typeof postSubscriptionBodySchema>

interface User {
  ref: {
    id: string
  }
  data: {
    email: string
    stripe_customer_id: string
  }
}

const postCheckout: NextApiHandler<
  PostSubscriptionResponse | NextAPIResponseError
> = async (req, res) => {
  const body = postSubscriptionBodySchema.safeParse(req.body)

  const session = await getServerSession(req, res, authOptions)
  const userEmail = session?.user?.email

  if (!userEmail) {
    return res
      .status(403)
      .json({ message: 'Bad Request', errors: ['User not logged in'] })
  }

  if (!body.success) {
    const errorsMessages = body.error.errors.map((err) => err.message)

    return res
      .status(400)
      .json({ message: 'Bad Request', errors: errorsMessages })
  }

  const priceId = body.data.priceId

  try {
    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(userEmail))),
    )

    let userCustomerId = user.data.stripe_customer_id

    if (!userCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email: userEmail,
      })

      userCustomerId = stripeCustomer.id

      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: { stripe_customer_id: userCustomerId },
        }),
      )
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: userCustomerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return res.status(200).json({
      sessionId: stripeCheckoutSession.id,
      checkoutURL: stripeCheckoutSession.url!,
    })
  } catch (err: any) {
    const errorStatus = err?.requestResult?.statusCode

    if (errorStatus === 404) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('POST')(postCheckout)
