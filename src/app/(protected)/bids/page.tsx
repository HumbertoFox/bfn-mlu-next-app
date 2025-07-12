import db from '@/app/lib/db';
import ShowBidsClient from '@/components/ui/showbids';

export default async function ProtectedDashboardPage() {
    const bitcoins = await db.bid.findMany({ where: { cryptocurrency: 'bitcoin' }, select: { id: true, amount: true }, orderBy: { amount: 'asc' } });
    const ethereums = await db.bid.findMany({ where: { cryptocurrency: 'ethereum' }, select: { id: true, amount: true }, orderBy: { amount: 'asc' } });
    const binancecoins = await db.bid.findMany({ where: { cryptocurrency: 'binancecoin' }, select: { id: true, amount: true }, orderBy: { amount: 'asc' } });
    return (
        <ShowBidsClient bitcoins={bitcoins} ethereums={ethereums} binancecoins={binancecoins} />
    );
}