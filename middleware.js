import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// import { decodeToken } from "./src/lib/utils/jwt-token";
// Dsc: [Task 5]: [Middleware access next-auth]
export async function middleware(req){
    
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: false
    })

    console.log(`${"-".repeat(8)}\nMiddleware |\nToken:`, token,`\nReq`, req)

    if(req.nextUrl.pathname.startsWith('/shows') && !token) return NextResponse.redirect(new URL('/auth/login', req.url))
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/shows',
        '/shows/:path*'
    ]
}