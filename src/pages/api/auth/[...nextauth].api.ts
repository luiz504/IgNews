import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET_KEY,
    }),
  ],
}

export default NextAuth(authOptions)