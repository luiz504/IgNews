import { query as q } from 'faunadb'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import { fauna } from '~/libs/fauna'

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET_KEY,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email ?? '')),
              ),
            ),
            q.Create(q.Collection('users'), { data: { email: user.email } }),
            q.Get(
              q.Match(q.Index('user_by_email'), q.Casefold(user.email ?? '')),
            ),
          ),
        )

        return true
      } catch {
        return false
      }
    },
  },
}

export default NextAuth(authOptions)
