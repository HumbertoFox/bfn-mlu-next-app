'use client';

import Image from 'next/image';
import UpdatePasswordUserForm from '@/components/ui/update-password-form';
import UpdateEmailUserForm from '@/components/ui/update-email-form';
import UserDataForm from '@/components/ui/info-user-form';
import UpdatePhoneUserForm from '@/components/ui/update-phone-form';

export default function UpdateUser() {
    return (
        <div className='w-full min-h-[calc(100svh - 73px)] flex items-center justify-center p-3'>
            <div className='w-96 flex flex-col items-center justify-center gap-5 rounded-lg shadow shadow-orange-400 p-3'>
                <Image
                    className='pt-6'
                    src={'/images/bitcoin-user.png'}
                    width={75}
                    height={75}
                    alt='Icon Usuário Biticoin'
                    priority
                />

                <UserDataForm />

                <UpdatePhoneUserForm />

                <UpdateEmailUserForm />

                <UpdatePasswordUserForm />
            </div>
        </div>
    );
};