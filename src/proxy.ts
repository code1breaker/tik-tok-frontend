import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import {
  API_AUTH_PREFIX,
  HOME_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
} from "./constants/endpoints";

export const publicRoutes = [""];
export const authRoutes = [LOGIN_PATH, SIGNUP_PATH];
const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) NextResponse.redirect(new URL(HOME_PATH, nextUrl));
    return;
  }

  // If route is protected
  if (!isPublicRoute && !isLoggedIn)
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));

  if (pathname === "/")
    return NextResponse.redirect(new URL(HOME_PATH, req.url));

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
