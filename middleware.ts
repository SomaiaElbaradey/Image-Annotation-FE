import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/tasks", "/"];

export async function middleware(request: NextRequest) {
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
        const token = request.cookies.get("token")?.value;
        const userData = request.cookies.get("userData")?.value;

        if (!token || !userData) {
            const absoluteURL = new URL("/login", request.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
