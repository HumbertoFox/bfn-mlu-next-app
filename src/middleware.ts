'use server';

import { isSessionValid } from '@/app/lib/isvalid';
import {
    NextRequest,
    NextResponse
} from 'next/server';

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)'
};

const publicRoutes = ['/login', '/signup', '/'];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    };

    const session = await isSessionValid();

    if (!session) {
        const isAPIRoute = pathname.startsWith('/api');
        if (isAPIRoute) {
            return {
                message: 'Não autorizado',
                status: 401,
            };
        };
        return NextResponse.redirect(new URL('/login', req.url));
    };

    return NextResponse.next();
};