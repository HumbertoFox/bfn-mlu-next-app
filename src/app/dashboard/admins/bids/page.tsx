import prisma from '@/lib/prisma';
import { ChartBids } from '@/components/chartbids';
import ShowBidsClient from '@/components/showbids';
import BidsBreadcrumb from '@/components/breadcrumbs/bids-breadcrumb';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('BidsPage.Metadata');
  return {
    title: t('Title')
  };
};

export default async function BidsPage() {
    const bitcoins = await prisma.bid.findMany({ where: { cryptocurrency: 'bitcoin' }, select: { id: true, amount: true }, orderBy: { amount: 'asc' } });
    const ethereums = await prisma.bid.findMany({ where: { cryptocurrency: 'ethereum' }, select: { id: true, amount: true }, orderBy: { amount: 'asc' } });
    const binancecoins = await prisma.bid.findMany({ where: { cryptocurrency: 'binancecoin' }, select: { id: true, amount: true }, orderBy: { amount: 'asc' } });

    const bitcoinCount = bitcoins.length;
    const ethereumCount = ethereums.length;
    const binancecoinCount = binancecoins.length;

    return (
        <>
            <BidsBreadcrumb />
            <div className='flex w-full h-full flex-col gap-4 rounded-xl p-4'>
                <ChartBids bitcoinCount={bitcoinCount} ethereumCount={ethereumCount} binancecoinCount={binancecoinCount} />
                <ShowBidsClient bitcoins={bitcoins} ethereums={ethereums} binancecoins={binancecoins} />
            </div>
        </>
    );
}