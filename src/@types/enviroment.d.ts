declare namespace NodeJS {
  interface ProcessEnv {
    STRIPE_SECRET_KEY: string;
    STRIPE_SUCCESS_URL: string;
    STRIPE_CANCEL_URL: string;
    STRIPE_WEBHOOK_SECRET_KEY: string;
    GITHUB_ID: string;
    GITHUB_SECRET_KEY: string;
    FAUNADB_SECRET_KEY: string;
    PRISMIC_ACCESS_TOKEN:string;
  }
}
