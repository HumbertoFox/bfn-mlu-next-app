'use client';

import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import Form from 'next/form';
import { CreateBid } from '@/app/api/actions/createbid';
import Image from 'next/image';
import gsap from 'gsap';
import { PayPalButtons, PayPalButtonsComponentProps, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import TermComponent from '@/components/term';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CriptoUpFormProps } from '@/types';

export default function CriptoUpForm({ cryptocurrency, onClose }: CriptoUpFormProps) {
    const [state, action] = useActionState(CreateBid, undefined);
    const [formData, setFormData] = useState({
        amount: '',
        paymentID: '',
        cryptocurrency: cryptocurrency,
    });
    const [isTerm, setIsTerm] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const formRef = useRef(null);

    const isValidateAmount = (value: string) => {
        const regex = (/^\d{1,3}(\.\d{3})*(,\d{2})?$/);
        const parsedValue = value.replace(',', '.');

        const isValidFormat = regex.test(value);

        const numericValue = parseFloat(parsedValue);
        const isValidNumber = !isNaN(numericValue) && numericValue >= 0;

        const isValidLength = value.length >= 4;
        const isWithinMaxValue = numericValue <= 999999999;

        return isValidFormat && isValidNumber && isValidLength && isWithinMaxValue;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleClose = () => {
        gsap.to(formRef.current, {
            opacity: 0,
            y: -500,
            scale: 0.5,
            duration: 1,
            onComplete: () => {
                onClose();
            },
        });
    };

    const handleTerm = () => setIsTerm(!isTerm);
    const handleChecked = () => setIsChecked(!isChecked);

    const initialOptions: ReactPayPalScriptOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        currency: 'BRL',
        intent: 'capture',
    };

    const createOrder: PayPalButtonsComponentProps['createOrder'] = async (_, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: '10.00',
                        currency_code: 'BRL'
                    }
                }
            ],
            intent: 'CAPTURE'
        });
    }
    const onApprove: PayPalButtonsComponentProps['onApprove'] = async (actions) => {
        const orderID = actions.orderID;

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('amount', formData.amount);
        formDataToSubmit.append('paymentID', orderID);
        formDataToSubmit.append('cryptocurrency', formData.cryptocurrency);

        startTransition(() => action(formDataToSubmit));

        toast.success('Sucesso!', {
            description: state?.message,
            style: { borderColor: 'green' },
        });

        handleClose();
    };

    useEffect(() => {
        if (cryptocurrency) {
            setFormData(prevState => ({
                ...prevState,
                cryptocurrency: cryptocurrency,
            }));
        };

        if (state?.message) {
            toast.success('Sucesso!', {
                description: state.message,
                style: { borderColor: 'green' }
            });

            setFormData(prevState => ({
                ...prevState,
                amount: '',
            }));
        };

        if (state?.info) {
            toast.warning('Atensão', {
                description: state.info,
                style: { borderColor: 'orange' },
            });
        };
    }, [cryptocurrency, state]);
    useEffect(() => {
        const formDown = formRef.current;

        gsap.fromTo(formDown, {
            opacity: 0,
            y: -500,
            scale: 0.5
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1
        });
    }, []);
    return (
        <div
            className='absolute w-full h-screen top-0 flex justify-center items-center backdrop-blur-sm'
            ref={formRef}
        >
            <PayPalScriptProvider options={initialOptions}>
                <Form
                    className='absolute w-full max-w-96 top-12 flex flex-col gap-5 bg-white p-5 border border-blue-500 rounded-lg shadow-md shadow-blue-500'
                    id='crypto-form'
                    action={action}
                >
                    <Image
                        className='rounded-xl'
                        src={`/images/${cryptocurrency}.png`}
                        alt={`Image cripto ${cryptocurrency}`}
                        width={512}
                        height={512}
                    />

                    <div className='min-w-full flex flex-col'>
                        <label
                            className='text-sm'
                            htmlFor='amount'
                        >
                            Lance
                        </label>
                        <input
                            className={`w-full rounded p-2 border ${isChecked ? 'cursor-default' : 'cursor-not-allowed'}`}
                            id='amount'
                            name='amount'
                            placeholder='Seu lance'
                            type='text'
                            tabIndex={1}
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            disabled={!isChecked}
                        />
                        {state?.errors?.amount && (
                            <p className='text-red-500 text-sm pl-2'>
                                {state.errors.amount}
                            </p>
                        )}
                    </div>

                    <div className='min-w-full flex flex-col'>
                        <label
                            className='text-sm'
                            htmlFor='cryptocurrency'
                        >
                            Nome da Cripto
                        </label>
                        <input
                            className='w-full rounded p-2 border cursor-not-allowed'
                            id='cryptocurrency'
                            name='cryptocurrency'
                            placeholder='Nome da Cripto'
                            type='text'
                            tabIndex={2}
                            value={formData.cryptocurrency}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                        {state?.errors?.cryptocurrency && (
                            <p className='text-red-500 text-sm pl-2'>
                                {state.errors.cryptocurrency}
                            </p>
                        )}
                    </div>

                    <div className='min-w-full flex items-center gap-2'>
                        <label
                            className='text-sm text-nowrap hover:text-slate-500 duration-300'
                            htmlFor='donation'
                        >
                            <button
                                className='underline decoration-solid'
                                type='button'
                                title='Termo de Doação'
                                onClick={handleTerm}
                            >
                                {
                                    isChecked
                                        ? 'Termo de Doação Assinado'
                                        : 'Leia o termo de doação para liberar o Lance'
                                }
                            </button>
                        </label>
                        <input
                            className='cursor-not-allowed'
                            id='donation'
                            name='donation'
                            type='checkbox'
                            checked={isChecked}
                            readOnly
                            required
                        />
                    </div>

                    <div className='flex flex-col justify-between my-auto'>
                        <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={(err) => {
                                console.error('Erro no pagamento:', err);
                                toast.error('Erro!', {
                                    description: 'Ocorreu um erro no pagamento.',
                                    style: { borderColor: 'red' },
                                });
                            }}

                            disabled={!isValidateAmount(formData.amount)}
                        />

                        <Button
                            type='button'
                            onClick={handleClose}
                            className='bg-red-500 hover:bg-red-400'
                        >
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </PayPalScriptProvider>
            {isTerm && (
                <TermComponent
                    handleChecked={handleChecked}
                    checked={isChecked}
                    handleTerm={handleTerm}
                />
            )}
        </div >
    );
}