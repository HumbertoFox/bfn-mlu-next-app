'use client';

import SubmitButton from '@/app/components/Buttons/SubmitButton';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { signup } from '@/app/actions/auth';
import Form from 'next/form';
import Icon from '../Icons/Icons';

export default function SignupForm() {
    const { pending } = useFormStatus();

    const [state, action] = useActionState(signup, undefined);

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        name: '',
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

    return (
        <Form className='w-full flex flex-col gap-5' action={action}>
            <div className='min-w-full flex flex-col'>
                <label htmlFor='name'>Nome do Usuário</label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='name'
                    name='name'
                    placeholder='Nome'
                    value={formData.name}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                />
                {state?.errors?.name && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.name}
                    </p>
                )}
            </div>

            <div className='min-w-full flex flex-col'>
                <label htmlFor='email'>E-mail</label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='email'
                    name='email'
                    placeholder='E-mail'
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
                <label htmlFor='password'>Senha</label>
                <div className='relative flex items-center'>
                    <input
                        className='w-full rounded py-0.5 px-2 border'
                        id='password'
                        name='password'
                        type={isPasswordVisible
                            ? 'text'
                            : 'password'
                        }
                        value={formData.password}  // Vinculando o valor ao estado
                        onChange={handleChange}  // Atualizando o estado ao digitar
                    />
                    <button
                        className='absolute right-1 text-blue-400'
                        type='button'
                        title={isPasswordVisible
                            ? 'Não Mostrar Senha'
                            : 'Mostrar Senha'
                        }
                        onClick={togglePasswordVisibility}
                    >
                        <Icon icon={isPasswordVisible
                            ? 'fa-solid fa-eye-slash'
                            : 'fa-solid fa-eye'
                        }
                        />
                    </button>
                </div>
                {state?.errors?.password && (
                    <div>
                        <p className='text-red-500 text-sm pl-2'>A senha deve:</p>
                        <ul>
                            {state.errors.password.map(error => (
                                <li
                                    className='text-red-500 text-sm pl-2'
                                    key={error}
                                >- {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <SubmitButton disabled={pending}>
                Entrar
            </SubmitButton>
        </Form>
    );
};