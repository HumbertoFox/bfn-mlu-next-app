'use server';

import prisma from '@/lib/prisma';

export async function CryptosData() {
    const bitcoinBidCount = await prisma.bid.count({
        where: {
            cryptocurrency: 'bitcoin'
        },
    });

    const ethereumBidCount = await prisma.bid.count({
        where: {
            cryptocurrency: 'ethereum',
        },
    });

    const bnbBidCount = await prisma.bid.count({
        where: {
            cryptocurrency: 'binancecoin',
        },
    });

    const bitcoinLastBid = await prisma.bid.findFirst({
        where: {
            cryptocurrency: 'bitcoin',
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            createdAt: true,
        },
    });

    const ethereumLastBid = await prisma.bid.findFirst({
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

    const bnbLastBid = await prisma.bid.findFirst({
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

    return {
        bitcoinBidCountData: bitcoinBidCount ? bitcoinBidCount : null,
        ethereumBidCountData: ethereumBidCount ? ethereumBidCount : null,
        bnbBidCountData: bnbBidCount ? bnbBidCount : null,
        bitcoinLastBidDate: bitcoinLastBid ? bitcoinLastBid.createdAt : null,
        ethereumLastBidDate: ethereumLastBid ? ethereumLastBid.createdAt : null,
        bnbLastBidDate: bnbLastBid ? bnbLastBid.createdAt : null,
    };
};