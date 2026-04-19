import { NextRequest, NextResponse } from "next/server";
import { HOME_PATH, LOGIN_PATH, SIGNUP_PATH } from "./constants/endpoints";

const PUBLIC_ROUTES = [LOGIN_PATH, SIGNUP_PATH];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  const accessToken = req.cookies.get("accessToken");

  // If route is protected and no accessToken
  if (!isPublic && !accessToken)
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));

  if (pathname === "/")
    return NextResponse.redirect(new URL(HOME_PATH, req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
