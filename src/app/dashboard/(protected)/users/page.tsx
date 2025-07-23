import db from '@/app/lib/db';
import ShowUsersClients from '@/components/ui/users-clients';

export default async function ShowUsers() {
    const users = await db.user.findMany({ where: { role: 'USER' }, select: { id: true, cpf: true, username: true, email: true } });
    return (
        <div className='flex w-full max-w-[1440px] h-full flex-col gap-4 rounded-xl p-4'>
            <ShowUsersClients users={users} />
        </div>
    );
}