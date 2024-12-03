import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface PublicOnlyPaths {
  [key: string]: boolean;
}

const publicOnlyPaths: PublicOnlyPaths = {
  '/login': true,
  '/create-account': true
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicPath = publicOnlyPaths[request.nextUrl.pathname];

  if (!session.id) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
