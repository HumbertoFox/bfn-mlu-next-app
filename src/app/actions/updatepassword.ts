'use server';

import { cookies } from 'next/headers'; // Para acessar os cookies
import { UpdatePasswordFormSchema } from '@/app/lib/definitions';
import { FormStateIn } from '@/components/types/types';
import * as bcrypt from 'bcryptjs';
import db from '@/app/lib/db';
import { openSessionToken } from '@/app/lib/opentoken';

export async function UpdatePassword(state: FormStateIn, formData: FormData) {
    // 1. Obter o username do cookie
    const sessionCookie = (await cookies()).get('sessionAuthToken')?.value;

    if (sessionCookie) {
        const payload = await openSessionToken(sessionCookie);

        // 2. Verificar se o cookie existe e é uma string
        if (!payload || typeof payload.username !== 'string') return { info: 'Usuário não autenticado!' };

        // Agora temos a string do username
        const username = payload.username;

        // 3. Validar campos de formulário
        const validatedFields = UpdatePasswordFormSchema.safeParse({
            old_password: formData.get('old_password') as string,
            password: formData.get('password') as string,
        });

        // 4. Se algum campo de formulário for inválido, retorne antecipadamente
        if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

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

            if (!isPasswordValid) return { info: 'Senha antiga esta incorreta!' };

            // Comparando senha criptografada cadastrada no banco com a senha nova
            const isNewPasswordOld = await bcrypt.compare(password, existingUser.password);

            if (isNewPasswordOld) return { info: 'A nova senha não pode ser a mesma que a atual!' };

            // Atualizando senha no banco
            await db.user.update({
                where: {
                    id: existingUser.id,
                },
                data: {
                    password: hashedPassword,
                },
            });

            // Mensagem de exito
            return { message: 'Senha atualizada com Sucesso!' };
        };
    }

    return { info: 'Erro com o Banco de Dados!', };
};