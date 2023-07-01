declare namespace NodeJS {
  interface ProcessEnv {
    STRIPE_SECRET_KEY: string;
    GITHUB_ID: string;
    GITHUB_SECRET_KEY: string;
    FAUNADB_SECRET_KEY: string;
  }
}
