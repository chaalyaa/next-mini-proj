import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { generateToken } from "@/src/lib/utils/jwt-token";
import moment from "moment/moment";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'mini-proj',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    placeholder: 'example@example.com'
                },
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req){
                console.log(`\n${"=".repeat(8)}\nfn authorize credentialProvider\nCred:`, credentials)
            
                let data = {
                    // rc: "00",
                    ...credentials
                }
                console.log('data', data)

                const token = await generateToken(data, "1d");
                Reflect.set(data, 'token', token)

                return {
                    error: false,
                    data
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        maxAge: 30,
        strategy: 'jwt',
    },
    jwt: {
        maxAge: 30,
        secret: process.env.NEXTAUTH_SECRET
    },
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        async redirect({url, baseUrl}){
            return baseUrl
        },
        async signIn({account, profile, user, credentials}){
            console.log(`\n${"=".repeat(8)}\nfn signIn\nAccount:`, account)
            
            switch(account?.provider){
                case "credentials":
                    return user?.error === false
                default:
                    return false
            }
        },
        async jwt({token = {}, user, profile, account}){
            user && (token.user = {
                ...user,
                bearer_token:  token?.user?.token ?? null,
                id: token?.user?.id ?? null,
                email: token?.user?.email ?? null,
            })
            console.log(`\n${"=".repeat(8)}\nfn jwt\nToken jwt:`, token)

            return {
                ...token,

            }
        },
        async session({session, token, user, profile, account}){
            console.log(`\n${"=".repeat(8)}\nfn session\nSession:`, session)

            if(Date.now() > moment(session?.expires))

            session.user = token?.user;
            session.profile = token?.profile ?? null;
            session.account = token?.account ?? null;
            session.data = token ?? null;

            return session;
        }
    },
    debug: false
})