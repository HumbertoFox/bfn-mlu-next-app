'use client';

import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import Form from 'next/form';
import { CreateBid } from '@/app/actions/createbid';
import { CriptoUpFormProps } from '@/components/interfaces/interfaces';
import Image from 'next/image';
import DangerButton from '@/components/buttons/dangerbutton';
import gsap from 'gsap';
import { PayPalButtons, PayPalButtonsComponentProps, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import TermComponent from '@/components/term';
import { toast } from 'sonner';

export default function CriptoUpForm({ cryptocurrency, onClose }: CriptoUpFormProps) {
    const [state, action] = useActionState(CreateBid, undefined);
    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        amount: '',
        paymentID: '',
        cryptocurrency: cryptocurrency, // Defina a criptomoeda a partir de adereços
    });
    const [isTerm, setIsTerm] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const formRef = useRef(null); // Ref para o formulário

    // Função de validação do campo de lance
    const isValidateAmount = (value: string) => {
        const regex = (/^\d{1,3}(\.\d{3})*(,\d{2})?$/); // Formato de número aceito (ex: 1.000,00 ou 1000.00)
        const parsedValue = value.replace(',', '.');  // Substitui a vírgula por ponto para facilitar a conversão

        // Verifica se o valor está no formato correto
        const isValidFormat = regex.test(value);

        // Converte para número e verifica se é válido e não negativo
        const numericValue = parseFloat(parsedValue);
        const isValidNumber = !isNaN(numericValue) && numericValue >= 0;

        // Verifica o comprimento mínimo (4 dígitos) e o máximo (999.999.999)
        const isValidLength = value.length >= 4;
        const isWithinMaxValue = numericValue <= 999999999;

        return isValidFormat && isValidNumber && isValidLength && isWithinMaxValue;
    };

    // Função para atualizar o valor dos campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Função para animar e fechar o formulário
    const handleClose = () => {
        gsap.to(formRef.current, {
            opacity: 0,
            y: -500,
            scale: 0.5,
            duration: 1,
            onComplete: () => {
                onClose(); // Chama o onClose para realizar qualquer outro efeito externo
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
                        value: '10.00', // Valor do pagamento fixo de R$10,00
                        currency_code: 'BRL' // Moeda em reais
                    }
                }
            ],
            intent: 'CAPTURE'
        });
    }

    const onApprove: PayPalButtonsComponentProps['onApprove'] = async (actions) => {
        // Obtenha o orderID da resposta do PayPal
        const orderID = actions.orderID;

        // Criar um objeto FormData com os dados do formulário
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('amount', formData.amount);
        formDataToSubmit.append('paymentID', orderID);
        formDataToSubmit.append('cryptocurrency', formData.cryptocurrency);

        startTransition(() => action(formDataToSubmit));

        // Mostre a notificação de sucesso
        toast.success('Sucesso!', {
            description: state?.message,
            style: { borderColor: 'green' },
        });

        handleClose();
    };

    // Messagem resposta do backend ou Atualizar o estado quando a prop cryptocurrency mudar
    useEffect(() => {
        if (cryptocurrency) {
            setFormData(prevState => ({
                ...prevState,
                cryptocurrency: cryptocurrency, // Atualiza apenas o campo cryptocurrency
            }));
        };

        if (state?.message) {
            toast.success('Sucesso!', {
                description: state.message,
                style: { borderColor: 'green' }
            });

            // Função para resetar o formulário
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
            className='absolute w-full min-h-screen top-0 flex justify-center items-center backdrop-blur-sm'
            ref={formRef}
        >
            <PayPalScriptProvider options={initialOptions}>
                <Form
                    className='absolute w-full max-w-96 lg:top-12 flex flex-col gap-5 bg-white p-5 border border-blue-500 rounded-lg shadow-md shadow-blue-500'
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
                            value={formData.amount}  // Vinculando o valor ao estado
                            onChange={handleChange}  // Atualizando o estado ao digitar
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
                            value={formData.cryptocurrency}  // Vinculando o valor ao estado
                            onChange={handleChange}  // Atualizando o estado ao digitar
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

                        <DangerButton onClick={handleClose}>
                            Cancelar
                        </DangerButton>
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