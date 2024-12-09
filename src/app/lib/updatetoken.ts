import 'server-only';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/lib/opentoken';

export async function updateSession() {
    const sessionAuthToken = (await cookies()).get('sessionAuthToken')?.value;

    // Usando o operador de asserção não nula (!) para garantir que o token não seja undefined
    if (!sessionAuthToken) {
        return null; // Se o token não for encontrado, retorna null
    };

    // Passando o token como string (sem o risco de undefined) para a função openSessionToken
    const payload = await openSessionToken(sessionAuthToken);

    if (!payload) {
        return null; // Retorna null se o payload for vazio ou inválido
    };

    const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set('sessionAuthToken', sessionAuthToken, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
};