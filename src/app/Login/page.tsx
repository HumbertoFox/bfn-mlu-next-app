import SignupForm from '@/app/components/ui/Signup-Form';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
    return (
        <div className='w-full h-svh flex items-center justify-center'>
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
                <SignupForm />
            </div>
        </div>
    );
};