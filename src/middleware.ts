import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  
  const requestHeaders = new Headers(request.headers);
  const cookieLanguage = (request as any).cookies.get('language')?.value || 'en';
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-theme', (request as any).cookies.get('theme')?.value);
  requestHeaders.set('x-language', cookieLanguage);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    } as any
  });
}
