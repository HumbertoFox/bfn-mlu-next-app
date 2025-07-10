'use server';

import db from '@/app/lib/db';

export async function CryptosData() {
    // 1. Consultando o número de lances para cada criptomoeda no banco de dados
    const bitcoinBidCount = await db.bid.count({
        where: {
            cryptocurrency: 'bitcoin'
        },
    });

    const ethereumBidCount = await db.bid.count({
        where: {
            cryptocurrency: 'ethereum',
        },
    });

    const bnbBidCount = await db.bid.count({
        where: {
            cryptocurrency: 'binancecoin',
        },
    });

    // 2. Consultando a data do último lance de cada criptomoeda
    const bitcoinLastBid = await db.bid.findFirst({
        where: {
            cryptocurrency: 'bitcoin',
        },
        orderBy: {
            // Ordenando pela data de criação mais recente
            createdAt: 'desc',
        },
        select: {
            // Retornando apenas a data do último lance
            createdAt: true,
        },
    });

    const ethereumLastBid = await db.bid.findFirst({
        where: {
            cryptocurrency: 'ethereum',
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            createdAt: true,
        },
    });

    const bnbLastBid = await db.bid.findFirst({
        where: {
            cryptocurrency: 'binancecoin',
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            createdAt: true,
        },
    });

    // Retorna os dados de lances como um objeto JSON
    return {
        // Aqui retornamos apenas os campos que selecionamos
        bitcoinBidCountData: bitcoinBidCount ? bitcoinBidCount : null,
        ethereumBidCountData: ethereumBidCount ? ethereumBidCount : null,
        bnbBidCountData: bnbBidCount ? bnbBidCount : null,
        bitcoinLastBidDate: bitcoinLastBid ? bitcoinLastBid.createdAt : null,
        ethereumLastBidDate: ethereumLastBid ? ethereumLastBid.createdAt : null,
        bnbLastBidDate: bnbLastBid ? bnbLastBid.createdAt : null,
    };
};