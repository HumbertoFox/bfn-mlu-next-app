'use server';

import { cookies } from 'next/headers'; // Para acessar os cookies
import { UpdatePasswordFormSchema } from '@/app/lib/definitions';
import { FormStateIn } from '../components/types/types';
import * as bcrypt from 'bcryptjs';
import db from '../lib/db';

export async function UpdatePassword(state: FormStateIn, formData: FormData) {
    // 1. Obter o username do cookie
    const cookieStore = cookies();
    const usernameCookie = (await cookieStore).get('username'); // Obtém o username do cookie

    // 2. Verificar se o cookie existe e é uma string
    if (!usernameCookie || typeof usernameCookie.value !== 'string') {
        return {
            info: 'Usuário não autenticado!',
        };
    };

    const username = usernameCookie.value; // Agora temos a string do username

    // 3. Validar campos de formulário
    const validatedFields = UpdatePasswordFormSchema.safeParse({
        old_password: formData.get('old_password') as string,
        password: formData.get('password') as string,
    });

    // 4. Se algum campo de formulário for inválido, retorne antecipadamente
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    };

    // 5. Preparar dados para inserção no banco de dados
    const { old_password, password } = validatedFields.data

    // 6. faça o hash da senha do usuário antes de armazená-la
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Verificando existencia do usuário logado no Banco
    const existingUser = await db.user.findFirst({
        where: {
            username,
        },
    });

    if (existingUser) {
        // Comparando senha criptografada cadastrada no banco
        const isPasswordValid = await bcrypt.compare(old_password, existingUser.password);

        if (!isPasswordValid) {
            return {
                info: 'Senha antiga esta incorreta!',
            };
        };

        // Comparando senha criptografada cadastrada no banco com a senha nova
        const isNewPasswordOld = await bcrypt.compare(password, existingUser.password);

        if (isNewPasswordOld) {
            return {
                info: 'A nova senha não pode ser a mesma que a atual!',
            };
        };

        // Atualizando senha no banco
        await db.user.update({
            where: {
                user_id: existingUser.user_id,
            },
            data: {
                password: hashedPassword,
            },
        });

        // Mensagem de exito
        return {
            message: 'Senha atualizada com Sucesso!',
        };
    };

    return {
        info: 'Erro com o Banco de Dados!',
    };
};