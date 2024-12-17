'use client';

import {
    useActionState,
    useEffect,
    useRef,
    useState
} from 'react';
import Form from 'next/form';
import { Toast } from '../ts/sweetalert';
import { CreateBid } from '@/app/actions/createbid';
import { CriptoUpFormProps } from '../interfaces/interfaces';
import Image from 'next/image';
import DangerButton from '../buttons/dangerbutton';
import gsap from 'gsap';
import {
    PayPalButtons,
    PayPalScriptProvider,
    ReactPayPalScriptOptions
} from '@paypal/react-paypal-js';

export default function CriptoUpForm({
    cryptocurrency,
    onClose
}: CriptoUpFormProps) {
    const [state, action] = useActionState(CreateBid, undefined);
    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        amount: '',
        cryptocurrency: cryptocurrency, // Defina a criptomoeda a partir de adereços
    });
    const formRef = useRef(null); // Ref para o formulário

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

    const initialOptions: ReactPayPalScriptOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        currency: 'BRL',
        intent: 'capture',
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
            Toast.fire({
                icon: 'success',
                title: state.message,
            });

            // Função para resetar o formulário
            setFormData(prevState => ({
                ...prevState,
                amount: '',
            }));
        };

        if (state?.info) {
            Toast.fire({
                icon: 'info',
                title: state.info
            });
        };
    }, [cryptocurrency, state]);

    useEffect(() => {
        const formDown = formRef.current;

        gsap.fromTo(
            formDown,
            {
                opacity: 0,
                y: -500,
                scale: 0.5
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scale: 1
            },
        );
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
                        src={`/images/${cryptocurrency}.webp`}
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
                            className='w-full rounded p-2 border'
                            id='amount'
                            name='amount'
                            placeholder='Seu lance'
                            type='text'
                            value={formData.amount}  // Vinculando o valor ao estado
                            onChange={handleChange}  // Atualizando o estado ao digitar
                            required
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

                    <div className='flex flex-col justify-between my-auto'>
                        <PayPalButtons />

                        <DangerButton onClick={handleClose}>
                            Cancelar
                        </DangerButton>
                    </div>
                </Form>
            </PayPalScriptProvider>
        </div >
    );
};