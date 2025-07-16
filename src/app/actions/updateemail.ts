'use server';

import { cookies } from 'next/headers'; // Para acessar os cookies
import { UpdateEmailFormSchema } from '@/app/lib/definitions';
import { FormStateIn } from '@/components/types/types';
import db from '@/app/lib/db';
import { openSessionToken } from '@/app/lib/opentoken';

export async function UpdateEmail(state: FormStateIn, formData: FormData) {
    // 1. Obter o username do cookie
    const sessionCookie = (await cookies()).get('sessionAuthToken')?.value;

    if (sessionCookie) {
        const payload = await openSessionToken(sessionCookie);

        // 2. Verificar se o cookie existe e é uma string
        if (!payload || typeof payload.username !== 'string') return { info: 'Usuário não autenticado!' };

        // Agora temos a string do username
        const username = payload.username;

        // 3. Validar campos de formulário
        const validatedFields = UpdateEmailFormSchema.safeParse({
            old_email: formData.get('old_email') as string,
            email: formData.get('email') as string,
        });

        // 4. Se algum campo de formulário for inválido, retorne antecipadamente
        if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

        // 5. Preparar dados para inserção no banco de dados
        const { old_email, email } = validatedFields.data

        // Verificando existencia do usuário logado no Banco
        const existingUser = await db.user.findFirst({
            where: {
                username,
            },
        });

        if (existingUser) {
            // 6. Verificar se o email fornecido é o mesmo que está no banco de dados
            if (existingUser.email !== old_email) return { info: 'O e-mail informado não corresponde ao e-mail atual!' };

            // 7. Verificar se o novo e-mail é diferente do antigo
            if (existingUser.email === email) return { info: 'O novo e-mail não pode ser o mesmo que o e-mail atual!' };

            // 8. Verificar se o novo e-mail já está cadastrado no banco de dados
            const emailExists = await db.user.findFirst({
                where: {
                    // Verifica se já existe um usuário com esse e-mail
                    email,
                },
            });

            if (emailExists) return { info: 'Este e-mail já está cadastrado!' };

            // Atualizando E-mail no banco
            await db.user.update({
                where: {
                    id: existingUser.id,
                },
                data: {
                    email,
                },
            });

            // Mensagem de exito
            return { message: 'E-mail atualizado com sucesso!' };
        };
    }

    return { info: 'Erro com o Banco de Dados!' };
};