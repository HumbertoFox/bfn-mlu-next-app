'use server';

import { SignupFormSchema } from '@/app/lib/definitions';
import { FormStateUp } from '../components/types/types';
import * as bcrypt from 'bcryptjs';
import db from '../lib/db';

export async function signup(state: FormStateUp, formData: FormData) {
    // Validar campos de formulário
    const validatedFields = SignupFormSchema.safeParse({
        cpf: formData.get('cpf') as string,
        dateofbirth: formData.get('dateofbirth') as string,
        name: formData.get('name') as string,
        username: formData.get('username') as string,
        phone: formData.get('phone') as string,
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
    const { cpf, dateofbirth, name, username, phone, email, password } = validatedFields.data

    // por exemplo, faça o hash da senha do usuário antes de armazená-la
    const hashedPassword = await bcrypt.hash(password, 12);

    // Verificando existencia de Dados no Banco
    const existingUser = await db.user.findFirst({
        where: {
            cpf,
            username,
            phone,
            email,
        },
    });

    if (existingUser) {
        return {
            info: 'Dados já Cadastrados',
        };
    };

    await db.user.create({
        data: {
            cpf,
            dateofbirth,
            name,
            username,
            phone,
            email,
            password: hashedPassword,
        },
    });

    return {
        message: 'Dados Cadastrados com Sucesso!',
    };
};