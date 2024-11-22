import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    if (!isAuth && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token) {
      const userRole = token.role as string;
      const path = req.nextUrl.pathname;

      if (path.startsWith("/admin") && userRole !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      if (path.startsWith("/owner") && userRole !== "OWNER") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      if (path.startsWith("/tenant") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      if (path.startsWith("/maintenance") && userRole !== "MAINTENANCE") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/owner/:path*",
    "/tenant/:path*",
    "/maintenance/:path*",
    "/login",
    "/register",
  ],
};