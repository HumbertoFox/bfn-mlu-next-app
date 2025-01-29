import Image from 'next/image';
import UpdatePasswordUserForm from '@/components/forms/updatepasswordform';
import UpdateEmailUserForm from '@/components/forms/updateemailform';
import UserDataForm from '@/components/forms/infouserform';
import UpdatePhoneUserForm from '@/components/forms/updatephoneform';

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