'use client';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table';

type CryptoData = {
    id: number;
    amount: string;
};

type ShowBidsProps = {
    bitcoins: CryptoData[];
    ethereums: CryptoData[];
    binancecoins: CryptoData[];
};

export default function ShowBidsClient({ bitcoins, ethereums, binancecoins }: ShowBidsProps) {
    const cryptoGroups = [
        { name: 'Bitcoin', data: bitcoins },
        { name: 'Ethereum', data: ethereums },
        { name: 'Binance Coin', data: binancecoins }
    ];
    return (
        <div className='flex w-full max-w-[1440px] h-full flex-col gap-4 rounded-xl p-4'>
            {cryptoGroups.map(group => (
                <Table key={group.name} className='min-w-full'>
                    <TableCaption>Lista de lances cripto {group.name}.</TableCaption>
                    <TableHeader>
                        <TableRow className='cursor-default'>
                            <TableHead className='text-center'>Posição</TableHead>
                            <TableHead className='text-center'>Identificação</TableHead>
                            <TableHead className='text-center'>Lance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {group.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-red-600 cursor-default text-center">
                                    Nenhum lance registrado para {group.name}.
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