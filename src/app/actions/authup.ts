'use server';

import { SignupFormSchema } from '@/app/lib/definitions';
import { FormStateUp } from '@/components/types/types';
import * as bcrypt from 'bcryptjs';
import db from '@/app/lib/db';
import { getCheckedCpf } from '@/app/lib/checkedcpf';

export async function signup(state: FormStateUp, formData: FormData) {
    // 1. Validar campos de formulário
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

    // Checando sequencia de npumeros é válido
    const checkedCpf = getCheckedCpf(cpf);

    // Messagem caso cpf inválido
    if (!checkedCpf) {
        return {
            info: 'Números do CPF inválido!'
        };
    };

    // faça o hash da senha do usuário antes de armazená-la
    const hashedPassword = await bcrypt.hash(password, 12);

    // Verificando existencia de Dados no Banco
    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { cpf },
                { username },
                { phone },
                { email },
            ],
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