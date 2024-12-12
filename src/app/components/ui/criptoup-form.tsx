'use client';

import SubmitButton from '@/app/components/buttons/submitbutton';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Form from 'next/form';
import { Toast } from '../ts/sweetalert';
import { CreateBid } from '@/app/actions/createbid';
import { CriptoUpFormProps } from '../interfaces/interfaces';
import Image from 'next/image';
import DangerButton from '../buttons/dangerbutton';
import gsap from 'gsap';

export default function CriptoUpForm({ cryptocurrency, onClose }: CriptoUpFormProps) {
    const { pending } = useFormStatus();
    const [state, action] = useActionState(CreateBid, undefined);
    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        amount: '',
        cryptocurrency: '', // Set the cryptocurrency from props
    });
    const formRef = useRef(null);

    // Função para atualizar o valor dos campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setFormData({
            amount: '',
            cryptocurrency: '',
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

    // Atualizar o estado quando a prop cryptocurrency mudar
    useEffect(() => {
        if (cryptocurrency) {
            setFormData((prevState) => ({
                ...prevState,
                cryptocurrency: cryptocurrency, // Atualiza apenas o campo cryptocurrency
            }));
        }
    }, [cryptocurrency]);

    // Messagem resposta do backend
    useEffect(() => {
        if (state?.message) {
            Toast.fire({
                icon: 'success',
                title: state.message,
            });

            resetForm(); // Resetando o formulário após sucesso

            // Usa setTimeout para garantir que o reload aconteça após o redirecionamento
            setTimeout(() => {
                window.location.reload(); // Recarrega a página após um curto intervalo
            }, 3000); // O tempo de 100ms é suficiente, mas pode ajustar conforme necessário
        };

        if (state?.info) {
            Toast.fire({
                icon: 'info',
                title: state.info
            });
        };
    }, [state]);

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
        <Form
            className='absolute w-full max-w-96 lg:top-12 flex flex-col gap-5 bg-white p-5 border border-blue-500 rounded-lg shadow-md shadow-blue-500'
            id='crypto-form'
            action={action}
            ref={formRef}
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

            <div className='flex justify-between my-auto'>
                <SubmitButton disabled={pending}>
                    Cadastrar Lance
                </SubmitButton>


                <DangerButton onClick={handleClose}>
                    Cancelar
                </DangerButton>
            </div>
        </Form>
    );
};