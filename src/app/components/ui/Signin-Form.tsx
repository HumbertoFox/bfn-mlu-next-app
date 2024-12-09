'use client';

import SubmitButton from '@/app/components/buttons/submitbutton';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Form from 'next/form';
import { signin } from '@/app/actions/authin';
import Icons from '../icons/icons';
import { Toast } from '../ts/sweetalert';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
    const { pending } = useFormStatus(); // Obter status pendente
    const router = useRouter();
    const [state, action] = useActionState(signin, undefined);

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

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
            username: '',
            email: '',
            password: '',
        });
    };

    useEffect(() => {
        if (state?.message) {
            Toast.fire({
                icon: 'success',
                title: state.message,
            });

            resetForm(); // Resetando o formulário após sucesso
            router.push('/dashboard');
        };

        if (state?.info) {
            Toast.fire({
                icon: 'info',
                title: state.info
            });
        }
    }, [router, state]);
    return (
        <Form className='w-full flex flex-col gap-5' action={action}>
            <div className='min-w-full flex flex-col'>
                <label
                    className='text-sm'
                    htmlFor='username'
                >
                    Nome do Usuário
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='username'
                    name='username'
                    placeholder='Nome do Usuário'
                    type='text'
                    required
                    value={formData.username}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                />
                {state?.errors?.username && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.username}
                    </p>
                )}
            </div>

            <div className='min-w-full flex flex-col'>
                <label
                    className='text-sm'
                    htmlFor='email'
                >
                    E-mail
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='email'
                    name='email'
                    placeholder='E-mail'
                    type='email'
                    required
                    value={formData.email}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                />
                {state?.errors?.email && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.email}
                    </p>
                )}
            </div>

            <div className='min-w-full w-full flex flex-col'>
                <label
                    className='text-sm'
                    htmlFor='password'
                >
                    Senha
                </label>
                <div className='relative flex items-center'>
                    <input
                        className='w-full rounded py-0.5 px-2 border'
                        id='password'
                        name='password'
                        placeholder='Senha'
                        type={isPasswordVisible
                            ? 'text'
                            : 'password'
                        }
                        required
                        value={formData.password}  // Vinculando o valor ao estado
                        onChange={handleChange}  // Atualizando o estado ao digitar
                    />
                    <button
                        className='absolute right-1 text-blue-400 hover:text-blue-600 duration-500'
                        type='button'
                        title={isPasswordVisible
                            ? 'Não Mostrar Senha'
                            : 'Mostrar Senha'
                        }
                        onClick={togglePasswordVisibility}
                    >
                        <Icons icon={isPasswordVisible
                            ? 'fa-solid fa-eye-slash'
                            : 'fa-solid fa-eye'
                        }
                        />
                    </button>
                </div>
                {state?.errors?.password && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.password}
                    </p>
                )}
            </div>
            <SubmitButton disabled={pending}>
                { pending ? 'Entrando...' : 'Entrar'}
            </SubmitButton>
        </Form>
    );
};