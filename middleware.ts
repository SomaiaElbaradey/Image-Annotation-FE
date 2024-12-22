import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "./lib/server/firebase";

const protectedRoutes = ["/tasks", "/"];

export async function middleware(request: NextRequest) {
    const user = auth.currentUser;

    console.log(user, "user");

    if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
        const absoluteURL = new URL("/login", request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
