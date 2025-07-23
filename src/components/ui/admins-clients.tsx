'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

type AdminsProps = {
    admins: {
        id: number;
        cpf: string;
        username: string;
        email: string;
    }[];
}

export default function ShowAdminsClients({ admins }: AdminsProps) {
    return (
        <div className='flex w-full max-w-[1440px] h-full flex-col gap-4 rounded-xl p-4'>
            <Table className="w-full text-center">
                <TableHeader>
                    <TableRow className='cursor-default'>
                        <TableHead className='text-center'>Código</TableHead>
                        <TableHead className='text-center'>CPF</TableHead>
                        <TableHead className='text-center'>UserName</TableHead>
                        <TableHead className='text-center'>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {admins.length === 0 && (
                        <TableRow className="text-red-600 cursor-default">
                            <TableCell colSpan={4}>Nenhum Usuário encontrado</TableCell>
                        </TableRow>
                    )}
                    {admins.map((admin, index) => (
                        <TableRow key={admin.id}>
                            <TableCell>{admin.id}</TableCell>
                            <TableCell>{admin.cpf}</TableCell>
                            <TableCell>{admin.username}</TableCell>
                            <TableCell>{admin.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}