'use server';

import { cookies } from 'next/headers';

export async function destroySession(): Promise<boolean> {
    const cookieStore = cookies();
    
    // Verifica se os cookies existem e deleta
    const sessionCookie = (await cookieStore).get('sessionAuthToken');
    const usernameCookie = (await cookieStore).get('usename');

    // Se qualquer um dos cookies existir, excluímos ambos
    if (sessionCookie || usernameCookie) {
        (await cookieStore).delete('sessionAuthToken');  // Deleta o cookie sessionAuthToken
        (await cookieStore).delete('username');  // Deleta o cookie username

        return true;
    };

    return false;
};