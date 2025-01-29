'use client';

import Image from 'next/image';
import Link from 'next/link';
import SignUpForm from '@/components/ui/signup-form';

export default function RegisterUser() {
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
                <Link
                    className='text-xs text-gray-400 hover:text-black duration-500'
                    href={'/login'}
                >
                    Já tenho Cadastro!
                </Link>
            </div>
        </div>
    );
};