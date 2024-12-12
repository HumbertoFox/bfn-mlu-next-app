'use server';

import { cookies } from 'next/headers'; // Para acessar os cookies
import { CreateBidFormSchema } from '@/app/lib/definitions';
import { FormStateCriptoUp } from '../components/types/types';
import db from '../lib/db';

export async function CreateBid(state: FormStateCriptoUp, formData: FormData) {
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
    const validatedFields = CreateBidFormSchema.safeParse({
        amount: formData.get('amount') as string,  // Garantir que o valor de 'amount' seja tratado como string
        cryptocurrency: formData.get('cryptocurrency') as string,
    });

    // 4. Se algum campo de formulário for inválido, retorne antecipadamente
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    };

    // 5. Preparar dados para inserção no banco de dados
    const { amount, cryptocurrency } = validatedFields.data

    // Verificando existencia do usuário logado no Banco
    const existingUser = await db.user.findFirst({
        where: {
            username,
        },
    });

    // Definir criptomoedas permitidas
    const allowedCryptos = ['bitcoin', 'ethereum', 'binancecoin'];

    // 6. Verificar se a criptomoeda é válida
    if (!allowedCryptos.includes(cryptocurrency.toLowerCase())) {
        return {
            info: 'Criptomoeda não permitida. Apenas bitcoin, ethereum e binancecoin são aceitas.',
        };
    };

    if (existingUser) {
        // Cadastrando lance no banco
        await db.bid.create({
            data: {
                amount,
                cryptocurrency,
                userId: existingUser.id,
            },
        });

        // Mensagem de exito
        return {
            message: 'Lance cadastrado com Sucesso!',
        };
    };

    return {
        info: 'Erro com o Banco de Dados!',
    };
};