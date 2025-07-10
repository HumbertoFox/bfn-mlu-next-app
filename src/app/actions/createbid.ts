'use server';

import { cookies } from 'next/headers'; // Para acessar os cookies
import { CreateBidFormSchema } from '@/app/lib/definitions';
import { FormStateCriptoUp } from '@/components/types/types';
import db from '@/app/lib/db';

export async function CreateBid(state: FormStateCriptoUp, formData: FormData) {
    // 1. Obter o username do cookie
    const cookieStore = cookies();
    // Obtém o username do cookie
    const usernameCookie = (await cookieStore).get('username');

    if (!usernameCookie || typeof usernameCookie.value !== 'string') return { info: 'Usuário não autenticado!' };

    // Agora temos a string do username
    const username = usernameCookie.value;

    // 2. Validar campos de formulário
    const validatedFields = CreateBidFormSchema.safeParse({
        // Garantir que o valor de 'amount' seja tratado como string
        amount: formData.get('amount') as string,
        // Pega o paymentID (orderID)
        paymentID: formData.get('paymentID') as string,
        cryptocurrency: formData.get('cryptocurrency') as string,
    });

    // 3. Se algum campo de formulário for inválido, retorne antecipadamente
    if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

    // 4. Preparar dados para inserção no banco de dados
    const { amount, paymentID, cryptocurrency } = validatedFields.data

    // Verificar existência do usuário no banco
    const existingUser = await db.user.findFirst({
        where: {
            username,
        },
    });

    // Definir criptomoedas permitidas
    const allowedCryptos = ['bitcoin', 'ethereum', 'binancecoin'];

    // 5. Verificar se a criptomoeda é válida
    if (!allowedCryptos.includes(cryptocurrency.toLowerCase())) return { info: 'Criptomoeda não permitida. Apenas bitcoin, ethereum e binancecoin são aceitas.' };

    if (existingUser) {
        // Inserir o lance no banco, incluindo o paymentID
        await db.bid.create({
            data: {
                amount,
                paymentID,
                cryptocurrency,
                userId: existingUser.id,
            },
        });

        // Mensagem de exito
        return { message: 'Lance cadastrado com Sucesso!' };
    };

    return { info: 'Erro com o Banco de Dados!' };
};