'use server';

import { SigninFormSchema } from '@/app/lib/definitions';
import { FormStateIn } from '../components/types/types';
import * as bcrypt from 'bcryptjs';
import db from '../lib/db';
import { createSessionToken } from '../lib/createtoken';

export async function signin(state: FormStateIn, formData: FormData) {
    // Validar campos de formulário
    const validatedFields = SigninFormSchema.safeParse({
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    // Se algum campo de formulário for inválido, retorne antecipadamente
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    };

    // 2. Preparar dados para inserção no banco de dados
    const { username, email, password } = validatedFields.data

    // Verificando existencia de Dados no Banco
    const existingUser = await db.user.findFirst({
        where: {
            username,
            email,
        },
    });

    if (existingUser) {
        // Comparando senha criptografada
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return {
                info: 'Dados informados inválido!',
            };
        };

        // Se o nome de usuário, e-mail e senha forem válidos, ele gera um token de sessão com user_id e email
        await createSessionToken({ sub: existingUser.user_id, username: existingUser.username, email: existingUser.email });

        return {
            message: 'Autenticado com Sucesso!',
        };
    };

    return {
        info: 'Dados informados inválido!',
    };
};