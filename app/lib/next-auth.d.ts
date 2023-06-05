import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
      user: {
        email: string,
        id: string,
        name: string,
        image: string,
        name: string,
        favourites: string[],
        basket: string[],
      } & DefaultSession["user"]
    }
  }