'use server';

import { CreateBidFormSchema, FormStateCriptoUp } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { getUser } from '@/lib/dal';

export async function CreateBid(state: FormStateCriptoUp, formData: FormData) {
    const sessionUser = await getUser();

    if (sessionUser) {
        const id = sessionUser.id;

        const validatedFields = CreateBidFormSchema.safeParse({
            amount: formData.get('amount') as string,
            paymentID: formData.get('paymentID') as string,
            cryptocurrency: formData.get('cryptocurrency') as string,
        });

        if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

        const { amount, paymentID, cryptocurrency } = validatedFields.data

        const existingUser = await prisma.user.findFirst({ where: { id }, select: { id: true } });

        const allowedCryptos = ['bitcoin', 'ethereum', 'binancecoin'];

        if (!allowedCryptos.includes(cryptocurrency.toLowerCase())) return { info: 'Criptomoeda não permitida. Apenas bitcoin, ethereum e binancecoin são aceitas.' };

        if (existingUser) {
            await prisma.bid.create({
                data: {
                    amount,
                    paymentID,
                    cryptocurrency,
                    userId: existingUser.id,
                },
            });

            return { message: 'Lance cadastrado com Sucesso!' };
        };
    }

    return { info: 'Erro com o Banco de Dados!' };
};