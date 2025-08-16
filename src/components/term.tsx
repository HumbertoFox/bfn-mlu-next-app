'use client';

import { UserData } from '@/app/api/actions/userdata';
import { formatCPF } from '@/lib/formatcpf';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TermComponentProps } from '@/types';
import { useTranslations } from 'next-intl';

const date = new Date();
const day = date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });

export default function TermComponent({ checked, handleTerm, handleChecked }: TermComponentProps) {
    const t = useTranslations('Term');
    const [isUserData, setIsUserData] = useState({
        cpf: '',
        name: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await UserData();

            if (userData?.existingUser) {
                const { cpf, name } = userData.existingUser;
                setIsUserData({
                    cpf: formatCPF(cpf),
                    name,
                });
            };
            return
        };

        fetchUserData();
    }, []);
    return (
        <>
            <div className='w-full min-h-screen flex flex-col'>
                <h1 className='text-center font-bold uppercase py-4'>
                    {t('TextH1')}
                </h1>
                <p className='font-bold py-2'>{t('TextP1')}</p>
                <p className='pl-5'>{t('TextP2')}</p>

                <p className='font-bold py-2'>{t('TextP3')}</p>
                <p className='pl-5'>{t('TextP4')}</p>

                <p className='font-bold py-2'>{t('TextP5')}</p>
                <p className='pl-5'>{t('TextP6')}</p>

                <p className='pl-5'>{t('TextP7')}</p>
                <p className='pl-5'>{t('TextP8')}</p>
                <p className='font-bold py-2'>{t('TextP9')}</p>
                <p className='pl-5'>{t('TextP10')}</p>

                <p className='font-bold py-2'>{t('TextP11')}</p>
                <p className='pl-5'>{t('TextP12')}</p>

                <p className='font-bold py-2'>{t('TextP13')}</p>
                <p className='pl-5'>{t('TextP14')}</p>

                <p className='font-bold py-2'>{t('TextP15')}</p>
                <p className='pl-5'>{t('TextP16')}</p>

                <p className='font-bold py-2'>{t('TextP17')}</p>
                <p className='pl-5'>{t('TextP18')}</p>

                <p className='font-bold py-2'>{t('TextP19')}</p>
                <p className='pl-5'>{t('TextP20')}</p>

                <p className='font-bold py-2'>{t('TextP21')}</p>
                <p className='pl-5'>{t('TextP22')}</p>

                <p className='font-bold text-center py-3'>{t('TextP23')}</p>
                <div className='flex justify-evenly text-center'>
                    <div>
                        <p className='font-bold text-left py-2'>{t('TextP24')}</p>
                        <p>{t('TextP25')}</p>
                        <p>{t('TextP26')}</p>
                        <p>{t('TextP27')}</p>
                        <p>{t('TextP28')}</p>
                    </div>

                    <div>
                        <p className='font-bold text-left py-2'>{t('TextP29')}</p>
                        <p className='uppercase'>{t('TextP30')} {isUserData.name}</p>
                        <p>{t('TextP31')} {isUserData.cpf}</p>
                    </div>
                </div>

                <p className='text-right py-4'>{t('TextP32')} {day}.</p>
            </div>

            <div className='min-w-full flex items-center justify-end gap-2'>
                <label
                    className='font-bold text-sm text-nowrap'
                    htmlFor='donation'
                >
                    {t('TextP33')}
                </label>
                <input
                    className='cursor-pointer'
                    id='donation'
                    name='donation'
                    type='checkbox'
                    checked={checked}
                    onChange={handleChecked}
                    required
                />
            </div>

            <div className="w-full flex justify-center pt-6">
                <Button
                    type="button"
                    onClick={handleTerm}
                    className="bg-red-500 hover:bg-red-400"
                >
                    {t('ButtonText')}
                </Button>
            </div>
        </>
    );
}