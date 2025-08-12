'use server';

import { getUser } from '@/lib/dal';
import prisma from '@/lib/prisma';

export async function UserData() {
    const sessionUser = await getUser();

    if (sessionUser) {
        const id = sessionUser.id;

        const existingUser = await prisma.user.findFirst({ where: { id }, select: { id: true, cpf: true, dateofbirth: true, name: true } });

        return {
            status: 200,
            existingUser
        };
    };
};