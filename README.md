# Ig.News

A NewLetter Application for estudying porposes, points and tools of knowledge:

- NextJS (Page)
- NextJS (API)
- Tailwind
- Stripe
  - Stripe Webhooks
- FaunaDB

## [Stripe CLI](https://stripe.com/docs/stripe-cli) WebHooks tool

This tool is required in devMode to listen the events from stripe and forwards to the localhost.

```bash
stripe listen --forward-to localhost:3000/api/webhooks
```
