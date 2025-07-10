import Image from 'next/image';
import Link from 'next/link';
import SignUpForm from '@/components/ui/signupform';
import db from '@/app/lib/db';

export default async function RegisterUser() {
    // Verificando se existe informações do usuário role ADMIN no banco de dados
    const isAdmin = await db.user.findFirst({
        where: { role: 'ADMIN' },
        select: { role: true }
    });
    return (
        <div className='w-full min-h-[calc(100svh - 73px)] flex items-center justify-center p-3'>
            <div className='w-96 flex flex-col items-center justify-center gap-5 rounded-lg shadow shadow-blue-400 p-3'>
                <Link href={'/'}>
                    <Image
                        className='pt-6'
                        src={'/images/bitcoin-user.png'}
                        width={75}
                        height={75}
                        alt='Icon Usuário Biticoin'
                        priority
                    />
                </Link>
                <SignUpForm />
                {isAdmin && <Link
                    className='text-xs text-gray-400 hover:text-black duration-500'
                    href={'/login'}
                >
                    Já tenho Cadastro!
                </Link>}
            </div>
        </div>
    );
};