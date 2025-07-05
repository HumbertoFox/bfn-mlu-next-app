'use server';

import { isSessionValid } from '@/app/lib/isvalid';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)'
};

const publicRoutes = ['/login', '/signup', '/'];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const session = await isSessionValid();

    // Se o usuário já está logado e está tentando acessar uma página pública, redireciona
    if (session && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', req.url)); // Redireciona para a página inicial ou dashboard
    };

    // Se o usuário não está logado e está tentando acessar uma página restrita, redireciona para login
    if (!session && !publicRoutes.includes(pathname)) {
        const isAPIRoute = pathname.startsWith('/api');

        if (isAPIRoute) {
            return {
                message: 'Não autorizado',
                status: 401,
            };
        };
        return NextResponse.redirect(new URL('/login', req.url)); // Redireciona para a página de login
    };

    // Se a sessão for válida ou a rota for pública, continua com a requisição
    return NextResponse.next();
};