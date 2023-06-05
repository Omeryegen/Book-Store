import NextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler =  NextAuth({
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
            name: { label: "Name", type: "text" },
            method : {label: "Method",type: 'text'}, 
          },
          async authorize(credentials, req) {
            
            if(credentials && credentials.method === "signUp"){
              const res = await fetch("http://localhost:3000/api/auth/register", {
                method: 'POST',
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                  name: credentials.name
                }),
                headers: { "Content-Type": "application/json" }
              })
              const user = await res.json()
              
              if (res.ok && user) {
                return user
              }
              return null
            }else if(credentials && credentials.method === "signIn") {
                const res = await fetch("http://localhost:3000/api/auth/login", {
                  method: 'POST',
                  body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password,
                  }),
                  headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (res.ok && user) {
                  return user
                }
                return null
            }
          else{
            return null
          }
          }
        })
      ],
      pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      }, 
      callbacks: {
        async jwt({ token, user }) {
          return {...token, ...user}
        },
        async session({ session, token }) {
          session.user = token as any
          return session
        }
      }
})



export  {handler as GET, handler as POST}