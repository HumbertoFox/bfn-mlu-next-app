'use server';

import { cookies } from 'next/headers';

export async function destroySession(): Promise<boolean> {
    const cookieStore = cookies();
    const cookie = (await cookieStore).get('sessionAuthToken');

    if (cookie) {
        (await cookieStore).delete('sessionAuthToken');
        return true;
    };

    return false;
};