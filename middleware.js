import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images/|favicon\\.webp|logo\\.webp|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest).*)",
  ],
};
