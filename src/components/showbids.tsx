'use client';

import { ShowBidsProps } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useTranslations } from 'next-intl';

export default function ShowBidsClient({ bitcoins, ethereums, binancecoins }: ShowBidsProps) {
    const t = useTranslations('ChartBids');
    const cryptoGroups = [
        { name: 'Bitcoin', data: bitcoins },
        { name: 'Ethereum', data: ethereums },
        { name: 'Binance Coin', data: binancecoins }
    ];
    return (
        <div className='flex w-full h-full flex-col gap-4 rounded-xl p-4'>
            {cryptoGroups.map(group => (
                <Table key={group.name} className='min-w-full'>
                    <TableCaption>{t('TableCaption')} {group.name}.</TableCaption>
                    <TableHeader>
                        <TableRow className='cursor-default'>
                            <TableHead className='text-center'>{t('TableHeaderPosition')}</TableHead>
                            <TableHead className='text-center'>{t('TableHeaderId')}</TableHead>
                            <TableHead className='text-center'>{t('TableHeaderLance')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {group.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-red-600 cursor-default text-center">
                                    {`${t('TableCellNoLances')} ${group.name}.`}
                                </TableCell>
                            </TableRow>
                        ) : (
                            group.data.map((crypto, index) => (
                                <TableRow key={crypto.id} className='cursor-default'>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{crypto.id}</TableCell>
                                    <TableCell>{crypto.amount}</TableCell>
                                </TableRow>
                            )))}
                    </TableBody>
                </Table>
            ))}
        </div>
    );
}