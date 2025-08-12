'use server';

import { createAdminSchema, FormStateCreateAdmin } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';
import * as bcrypt from 'bcrypt-ts';

export async function createAdmin(state: FormStateCreateAdmin, formData: FormData): Promise<FormStateCreateAdmin> {
    const validatedFields = createAdminSchema.safeParse({
        name: formData.get('name') as string,
        cpf: formData.get('cpf') as string,
        dateofbirth: formData.get('dateofbirth') as string,
        username: formData.get('username') as string,
        email: (formData.get('email') as string),
        confirm_email: (formData.get('confirm_email') as string),
        phone: (formData.get('phone') as string),
        password: formData.get('password') as string,
        password_confirmation: formData.get('password_confirmation') as string
    });

    if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

    const { name, cpf, dateofbirth, username, phone, email, password } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findFirst({ where: { OR: [{ cpf }, { username }, { phone }, { email }] } });

        if (existingUser) return { warning: 'WarningUserExisting' };

        const existingUserAdmin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });

        const role = existingUserAdmin ? 'USER' : 'ADMIN';

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({ data: { name, cpf, dateofbirth, username, phone, email, role, password: hashedPassword } });

        await createSession(user.id, user.role);

        return { message: true };
    } catch (error) {
        console.error(error);
        return { warning: 'Warning' };
    }
}