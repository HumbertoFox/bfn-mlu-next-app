import db from '@/app/lib/db';
import ShowAdminsClients from '@/components/ui/admins-clients';

export default async function ShowAdmins() {
    const admins = await db.user.findMany({ where: { role: 'ADMIN' }, select: { id: true, cpf: true, username: true, email: true } });
    return (
        <div className='flex w-full max-w-[1440px] h-full flex-col gap-4 rounded-xl p-4'>
            <ShowAdminsClients admins={admins} />
        </div>
    );
}