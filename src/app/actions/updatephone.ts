'use server';

import { cookies } from 'next/headers'; // Para acessar os cookies
import { UpdatePhoneFormSchema } from '@/app/lib/definitions';
import { FormStateUp } from '../components/types/types';
import db from '../lib/db';

export async function UpdatePhone(state: FormStateUp, formData: FormData) {
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
    const validatedFields = UpdatePhoneFormSchema.safeParse({
        old_phone: formData.get('old_phone') as string,
        phone: formData.get('phone') as string,
    });

    // 4. Se algum campo de formulário for inválido, retorne antecipadamente
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    };

    // 5. Preparar dados para inserção no banco de dados
    const { old_phone, phone } = validatedFields.data

    // Verificando existencia do usuário logado no Banco
    const existingUser = await db.user.findFirst({
        where: {
            username,
        },
    });

    if (existingUser) {
        // 6. Verificar se o telefone fornecido é o mesmo que está no banco de dados
        if (existingUser.phone !== old_phone) {
            return {
                info: 'O telefone informado não corresponde ao telefone atual!',
            };
        };

        // 7. Verificar se o novo telefone é diferente do antigo
        if (existingUser.phone === phone) {
            return {
                info: 'O novo telefone não pode ser o mesmo que o telefone atual!',
            };
        };

        // 8. Verificar se o novo telefone já está cadastrado no banco de dados
        const emailExists = await db.user.findFirst({
            where: {
                phone, // Verifica se já existe um usuário com esse telefone
            },
        });

        if (emailExists) {
            return {
                info: 'Este Telefone já está Cadastrado!',
            };
        };

        // Atualizando Telefone no banco
        await db.user.update({
            where: {
                user_id: existingUser.user_id,
            },
            data: {
                phone,
            },
        });

        // Mensagem de exito
        return {
            message: 'Telefone atualizado com Sucesso!',
        };
    };

    return {
        info: 'Erro com o Banco de Dados!',
    };
};