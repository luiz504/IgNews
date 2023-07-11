![Coverage](./coverage/badges.svg)

"Hello! 👋

Welcome to my GitHub repository for the blog project I created during a ReactJS
boot camp. This project was built using Next.js, Stripe, OAuth with NextAuth with
the GitHub provider, FaunaDB, Prismic, and Jest.

The main purpose of this project was to enhance my knowledge and skills in unit
testing. As part of the boot camp, we were taught to use Sass, but I
took the initiative to switch to Tailwind CSS to further develop my skills in
that area.

The project is based on an old module from the Ignite boot camp in 2021. It served
as a valuable case study to learn and practice unit testing with Jest.

Feel free to explore the code, provide feedback. I'm open to collaboration and
appreciate any suggestions for improvement.

Thank you for visiting and happy coding! ✨"

# Ig.News

Ig.News is a newsletter application created for educational purposes. It covers
various points and tools of knowledge. The technologies and services
used in this project include:

- NextJS (Page Router)
- NextJS (API)
- NextAuth (Gibhub Oauth Provider)
- Tailwind (Css Framework)
- Stripe (Payment Gateway)
  - Stripe Webhooks to update users subscriptions status
- FaunaDB (Serveless Database)
- Prismic (CMS)
- Tests (Jest)

## Installation

To install the project dependencies, run the following command:

```bash
pnpm install
```

## Setup

Copy the file `.env.local.example` and remane it to `.env.local.` them follow the
next steps:

<details>
  <summary>
    FaunaDB Setup
  </summary>
  <br/>

To set up FaunaDB:

1. Go to the FaunaDB Dashboard web page and create a new database.
2. Configure the following collections:
   - Collection: `users`
     - Schema: { `email`: string, `stripe_customer_id`: string }
   - Collection: `subscriptions`
     - Schema: { `id`: string, `userId`: Ref(Collection(`users`), id),
       `status`: string, `price_id`: string }
3. Configure the following indexes:

   - Index: `user_by_stripe_customer_id`

     - Source collection: `users`
     - Terms: data.stripe_customer_id

   - Index: `user_by_email`

     - Source collection: `users`
     - Terms: `data.email`

   - Index: `subscription_by_user_ref`

     - Source collection: `subscriptions`
     - Terms: `data.userId`

   - Index: `subscription_by_status`

     - Source collection: `subscriptions`
     - Terms: `data.status`

   - Index: `subscription_by_id`

     - Source collection: `subscriptions`
     - Terms: `data.id`

4. Obtain the FaunaDB secret key:
   - In FaunaDB Dashboard, go to the dabatabase page > `Settings` >
     `Security` > `Database keys`.
   - Create a secret key and copy its value.
5. Set the `FAUNADB_SECRET_KEY` environment variable in the `.env.local` file
   to the secret key obtained in the previous step.

create a secret copy the value and:

on the file `.env.local` assign the var `FAUNADB_SECRET_KEY`.

</details>

<details>
  <summary> Stripe Setup </summary>

1. Open the [stripe website](https://stripe.com/) and login to your account.
2. Navigate to the Dashboard page.
3. Go to the `Products` tab and click on `Add Product`.
4. Fill in the necessary information for the product, including its name.
5. In the pricing section, select `Standard price` and set the price with a
   billing period of `Monthly`.
6. Save the changes.
7. Obtain the Stripe secret key
   - In the Stripe Dashboard, go to the Developers page > API Keys.
   - Copy the `Secret Key` from the Standard Keys section.
8. Set the `STRIPE_SECRET_KEY` environment variable in the `.env.local` file to
   the secret key obtained in the previous step.

</details>

<details>
  <summary> Stripe CLI Setup (DevTool) </summary>

The Stripe CLI is required in development mode to listen to Stripe WebHooks
events and forward them to the local server.

Follow these steps to set up the Stripe CLI:

[documentation](https://stripe.com/docs/stripe-cli)

1. Login to your Stripe account by running the following command in the terminal:

```bash
stripe login
```

2. Hit enter to open the integration link in the browser, accept the integration,
   and then check the terminal for the returned key.

3. Paste the returned key value into the `.env.local` file, assigning it to the
   `STRIPE_WEBHOOK_SECRET_KEY` variable.

4. Start the webhook listener to redirect events to the local server in
   development mode by running the following command:

```bash
pnpm stripe:dev
```

</details>

<details>
  <summary> Prismic CMS </summary>

### [Prismic Slice Machine](https://prismic.io/slice-machine)

Prismic Slice Machine is a development tool used to build `Page types`,
`Custom types`, and `Slices`. In this project, only a `Custom type` named `Post`
is used.

_To use `Slices` and `Page types`, follow the documentation._

To start Prismic Slice Machine, run the following command:

```bash
 pnpm slicemachine
```

It will run at [port 9999](http://localhost:9999)

### [Prismic Dashboard](https://prismic.io/dashboard)

To create **Posts**:

1. Login to the Prismic Dashboard.
2. Select the repository.
3. Go to the `Work` tab and click on `Create New`.
4. Fill in the fields for `title` and `content`.
5. Click on the `Publish` button.

The created post will now be available in the project and can be fetched using
the Prismic API request.

</details>

<details>
  <summary>Github OAuth Provider</summary>
  <br/>
  To set up the GitHub OAuth provider, follow these steps:

1. Login to your GitHub account and go to the repository that will be the app's
   OAuth host.
2. Navigate to Settings > Developer Settings > GitHub Apps > New GitHub App.
3. Fill in the required data for the GitHub App. For the homepage URL, you can
   use `http://localhost:3000`, and for the Authorization callback URL, use
   `http://localhost:3000/api/auth/callback/github` in development mode.
4. Click on `Create GitHub App`.
5. Take note of the `Client ID` and `Client Secret` provided by GitHub.
6. In the `.env.local` file, set the `GITHUB_ID` variable to the Client ID
   obtained in the previous step, and set the `GITHUB_SECRET_KEY` variable to
   the Client Secret.

</details>

## Development Mode Scripts

To run the project in development mode, you can use the following scripts:

```bash
  pnpn run dev
```

This script runs the project in development mode.

```bash
pnpn  run stripe:dev
```

This script starts the Stripe tool that redirects webhook events to the local
Next.js API.
