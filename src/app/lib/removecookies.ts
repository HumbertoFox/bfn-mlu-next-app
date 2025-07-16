'use server';

import { cookies } from 'next/headers';

export async function destroySession(): Promise<boolean> {
    const cookieStore = cookies();
    
    // Verifica se os cookies existem e deleta
    const sessionCookie = (await cookieStore).get('sessionAuthToken');

    // Se qualquer um dos cookies existir, excluímos ambos
    if (sessionCookie) {
        (await cookieStore).delete('sessionAuthToken');  // Deleta o cookie sessionAuthToken

        return true;
    };

    return false;
};