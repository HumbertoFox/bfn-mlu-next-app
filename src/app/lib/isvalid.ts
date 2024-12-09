'use server';

import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/lib/opentoken';

export async function isSessionValid(): Promise<boolean> {
    const sessionCookies = (await cookies()).get('sessionAuthToken');

    if (sessionCookies) {
        const { value } = sessionCookies;

        try {
            const sessionData = await openSessionToken(value);

            if (sessionData && sessionData.exp) {
                const { exp } = sessionData;

                const currentDate = new Date().getTime();

                return ((exp as number) * 1000) > currentDate;
            } else {
                console.error('Session data is invalid or missing "exp" property.');
                
                return false;
            };
        } catch (error) {
            console.error('Error while checking session validity:', error);

            return false;
        };
    };

    return false;
};