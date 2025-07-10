import SignInForm from '@/components/ui/signinform';
import Image from 'next/image';
import Link from 'next/link';
import db from '@/app/lib/db';
import { redirect } from 'next/navigation';

export default async function Login() {
    // Verificando se existe informações do usuário role ADMIN no banco de dados
    const isAdmin = await db.user.findFirst({
        where: { role: 'ADMIN' },
        select: { role: true }
    });
    if (!isAdmin) redirect('/signup');
    return (
        <div className='w-full h-[90svh] flex items-center justify-center'>
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
                <SignInForm />
                <div className='w-full flex justify-around'>
                    <Link
                        className='text-xs text-gray-400 hover:text-black duration-500'
                        href={'/'}
                    >
                        Esqueci a Senha!
                    </Link>

                    <Link
                        className='text-xs text-gray-400 hover:text-black duration-500'
                        href={'/signup'}
                    >
                        Não tenho Cadastro!
                    </Link>
                </div>
            </div>
        </div>
    );
};