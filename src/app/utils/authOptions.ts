import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email", placeholder: "jsmith"},
        password: {label: "Password", type: "password", placeholder: "**********"}
      },
      async authorize(credentials) : Promise<any>{
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials!.email
          }
        })
        if(!userFound) throw new Error("Verifica que el correo y contraseña sean correctos...")

        const matchPassword = await bcrypt.compare(credentials!.password, userFound.password)
        if(!matchPassword) throw new Error("Verifica que el correo y contraseña sean correctos...")

        return {
          ...userFound,
          password: null,
          role: userFound.role
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user } : { token: any, user?: any }){
      if(user) token.role = user.role
      return token
    },
    session({ session, token }: { session: any, token: any }){
      session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: "/dashboard"
  }
}
