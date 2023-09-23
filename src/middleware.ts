import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//  Todo-  Prevent redirect from preview/join route to profile route if Camera is turned on
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //   if(request.nextUrl.pathname.startsWith('/profile') && videoStatus){
  //     return NextResponse.redirect(new URL('/preview', request.url))
  //   }
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: '/about/:path*',
};
