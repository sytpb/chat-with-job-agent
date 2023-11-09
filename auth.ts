import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental // will be removed in future
} = NextAuth({
  providers: [GitHub,Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })],
  callbacks: {
    jwt({ token, profile }) {
      if (profile?.sub) { // Google profiles have a 'sub' field
        token.id = String(profile.sub);
        token.image = profile.picture;
      } else if (profile?.id) { // GitHub profiles have an 'id' field
        token.id = profile?.id;
        token.image = profile.avatar_url;
      }
      if (profile) {

        console.log({a:profile?.image , b:profile?.picture},profile)
      }
      
      return token
    },
    authorized({ auth }) {
      console.log(auth)
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
