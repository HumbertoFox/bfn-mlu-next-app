'use server';

import db from '../lib/db';

export async function CriptosData() {
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
            createdAt: 'desc', // Ordenando pela data de criação mais recente
        },
        select: {
            createdAt: true, // Retornando apenas a data do último lance
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
        bitcoinBidCountData: bitcoinBidCount ? bitcoinBidCount : null, // Aqui retornamos apenas os campos que selecionamos
        ethereumBidCountData: ethereumBidCount ? ethereumBidCount : null,
        bnbBidCountData: bnbBidCount ? bnbBidCount : null,
        bitcoinLastBidDate: bitcoinLastBid ? bitcoinLastBid.createdAt : null,
        ethereumLastBidDate: ethereumLastBid ? ethereumLastBid.createdAt : null,
        bnbLastBidDate: bnbLastBid ? bnbLastBid.createdAt : null,
    };
};