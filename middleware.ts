import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.pathname.replace("/checkout/", "");
  try {
    await jwtVerify(
      req.cookies.get("token") as string,
      new TextEncoder().encode(process.env.JWT_SECRET_SEED)
    );
    return NextResponse.next();
  } catch (error) {
    // console.log(req.page);
    return NextResponse.redirect(
      `http://localhost:3000/auth/login?p=/checkout/${url}`
    );
  }
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ["/checkout/:path"],
};
