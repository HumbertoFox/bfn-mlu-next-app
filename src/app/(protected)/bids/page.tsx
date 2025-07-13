import db from '@/app/lib/db';
import { ChartBids } from '@/components/charts/chartbids';
import ShowBidsClient from '@/components/ui/showbids';

export default async function ProtectedDashboardPage() {
    const bitcoins = await db.bid.findMany({ where: { cryptocurrency: 'bitcoin' }, select: { id: true, amount: true }, orderBy: { amount: 'asc' } });
    const ethereums = await db.bid.findMany({ where: { cryptocurrency: 'ethereum' }, select: { id: true, amount: true }, orderBy: { amount: 'asc' } });
    const binancecoins = await db.bid.findMany({ where: { cryptocurrency: 'binancecoin' }, select: { id: true, amount: true }, orderBy: { amount: 'asc' } });

    const bitcoinCount = bitcoins.length;
    const ethereumCount = ethereums.length;
    const binancecoinCount = binancecoins.length;

    return (
        <div className='flex w-full max-w-[1440px] h-full flex-col gap-4 rounded-xl p-4'>
            <ChartBids bitcoinCount={bitcoinCount} ethereumCount={ethereumCount} binancecoinCount={binancecoinCount} />
            <ShowBidsClient bitcoins={bitcoins} ethereums={ethereums} binancecoins={binancecoins} />
        </div>
    );
}