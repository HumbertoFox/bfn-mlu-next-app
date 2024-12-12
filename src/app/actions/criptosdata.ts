'use server';

import db from '../lib/db';

export async function CriptosData() {
    // 1. Consultando o número de lances para cada criptomoeda no banco de dados
    const bitcoinBidsCount = await db.bid.count({
        where: {
            cryptocurrency: 'bitcoin'
        },
    });

    const ethereumBidsCount = await db.bid.count({
        where: {
            cryptocurrency: 'ethereum',
        },
    });

    const bnbBidsCount = await db.bid.count({
        where: {
            cryptocurrency: 'binancecoin',
        },
    });

    // Retorna os dados de lances como um objeto JSON
    return {
        bitcoinBidsCount, // Aqui retornamos apenas os campos que selecionamos
        ethereumBidsCount,
        bnbBidsCount,
    };
};