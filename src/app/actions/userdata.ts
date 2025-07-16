'use server';

import db from '@/app/lib/db';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/lib/opentoken';

export async function UserData() {
    // 1. Obter o username do cookie
    const sessionCookie = (await cookies()).get('sessionAuthToken')?.value;

    if (sessionCookie) {
        const payload = await openSessionToken(sessionCookie);

        // 2. Verificar se o cookie existe e é uma string
        if (!payload || typeof payload.username !== 'string') return { info: 'Usuário não autenticado!' };

        const username = payload.username; // Agora temos a string do username

        // Verificando existencia de Dados no Banco
        const existingUser = await db.user.findFirst({
            where: { username },
            // Aqui selecionamos apenas os campos necessários
            select: {
                cpf: true,
                dateofbirth: true,
                name: true,
            },
        });

        // Retorna apenas os dados específicos
        return {
            status: 200,
            // Aqui retornamos apenas os campos que selecionamos
            existingUser
        };
    };
};