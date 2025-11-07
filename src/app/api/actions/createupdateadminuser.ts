'use server';

import { FormStateCreateUpdateAdminUser, getSignUpUpdateSchema, } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt-ts';
import z from 'zod';

export async function createUpdateAdminUser(state: FormStateCreateUpdateAdminUser, formData: FormData): Promise<FormStateCreateUpdateAdminUser> {
    const schema = getSignUpUpdateSchema(formData);

    const validatedFields = schema.safeParse({
        name: formData.get('name') as string,
        cpf: formData.get('cpf') as string,
        dateofbirth: formData.get('dateofbirth') as string,
        username: formData.get('username') as string,
        email: (formData.get('email') as string),
        confirm_email: (formData.get('confirm_email') as string),
        phone: (formData.get('phone') as string),
        role: formData.get('role') as string,
        password: formData.get('password') as string,
        password_confirmation: formData.get('password_confirmation') as string
    });

    const id = formData.get('id') as string | undefined;

    if (!validatedFields.success) return { errors: z.flattenError(validatedFields.error).fieldErrors };

    const { name, cpf, dateofbirth, username, email, phone, role, password } = validatedFields.data;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;

        if (id) {
            const userInDb = await prisma.user.findUnique({ where: { id } });

            if (!userInDb || userInDb.deletedAt) return { message: false };

            const hasChanges =
                userInDb.name !== name ||
                userInDb.cpf !== cpf ||
                userInDb.dateofbirth !== dateofbirth ||
                userInDb.username !== username ||
                userInDb.email !== email ||
                userInDb.phone !== phone ||
                userInDb.role !== role ||
                (hashedPassword && userInDb.password !== hashedPassword);

            if (!hasChanges) return { message: false };

            await prisma.user.update({ where: { id: id }, data: { name, cpf, dateofbirth, username, email, phone, role, ...(hashedPassword && { password: hashedPassword }) } });

            return { message: true };
        } else {
            const existingUser = await prisma.user.findFirst({ where: { email, username, deletedAt: {} } });

            if (existingUser) return { errors: { email: ['ErrorsZod.EmailAlreadyUse'] } };

            await prisma.user.create({ data: { name, cpf, dateofbirth, username, email, phone, role, password: hashedPassword! } });

            return { message: true };
        }
    } catch (error) {
        console.error(error);
        return { message: false };
    }
}