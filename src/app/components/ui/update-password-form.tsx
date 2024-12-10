'use client';

import SubmitButton from '@/app/components/buttons/submitbutton';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Form from 'next/form';
import Icons from '../icons/icons';
import { FormErrors } from '../types/types';
import { Toast } from '../ts/sweetalert';
import { UpdatePassword } from '@/app/actions/updatepassword';

export default function UpdatePasswordUserForm() {
    const { pending } = useFormStatus();
    const [state, action] = useActionState(UpdatePassword, undefined);

    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    const toggleOldPasswordVisibility = () => setIsOldPasswordVisible(!isOldPasswordVisible);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        old_password: '',
        password: '',
        confirm_password: '',
    });

    // Função para atualizar o valor dos campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Função de validação
    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};

        // Verificação de senha
        if (formData.password !== formData.confirm_password) {
            errors.password = 'As senhas não coincidem';
        };

        return errors;
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setFormData({
            old_password: '',
            password: '',
            confirm_password: '',
        });
    };

    const errors = validateForm();

    useEffect(() => {
        if (state?.message) {
            Toast.fire({
                icon: 'success',
                title: state.message,
            });

            resetForm(); // Resetando o formulário após sucesso
        };

        if (state?.info) {
            Toast.fire({
                icon: 'info',
                title: state.info
            });
        }
    }, [state]);
    return (
        <Form className='w-full flex flex-col gap-5' action={action}>
            <div className='min-w-full w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='old_password'
                >
                    Senha atual
                </label>
                <div className='relative flex items-center'>
                    <input
                        className='w-full rounded py-0.5 px-2 border'
                        id='old_password'
                        name='old_password'
                        placeholder='Senha atual'
                        type={isOldPasswordVisible
                            ? 'text'
                            : 'password'
                        }
                        value={formData.old_password}  // Vinculando o valor ao estado
                        onChange={handleChange}  // Atualizando o estado ao digitar
                        required
                    />
                    <button
                        className='absolute right-1 text-blue-400 hover:text-blue-600 duration-500'
                        type='button'
                        title={isOldPasswordVisible
                            ? 'Não Mostrar Senha'
                            : 'Mostrar Senha'
                        }
                        onClick={toggleOldPasswordVisibility}
                    >
                        <Icons icon={isOldPasswordVisible
                            ? 'fa-solid fa-eye-slash'
                            : 'fa-solid fa-eye'
                        }
                        />
                    </button>
                </div>
                {state?.errors?.old_password && (
                    <div>
                        <p className='text-red-500 text-sm pl-2'>A senha deve:</p>
                        <ul>
                            {state.errors.old_password.map(error => (
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

            <div className='min-w-full w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='password'
                >
                    Senha nova
                </label>
                <div className='relative flex items-center'>
                    <input
                        className='w-full rounded py-0.5 px-2 border'
                        id='password'
                        name='password'
                        placeholder='Senha nova'
                        type={isPasswordVisible
                            ? 'text'
                            : 'password'
                        }
                        value={formData.password}  // Vinculando o valor ao estado
                        onChange={handleChange}  // Atualizando o estado ao digitar
                        required
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

            <div className='min-w-full w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='confirm_password'
                >
                    Confirmar Senha nova
                </label>
                <div className='relative flex items-center'>
                    <input
                        className='w-full rounded py-0.5 px-2 border'
                        id='confirm_password'
                        name='confirm_password'
                        placeholder='Confirmar Senha nova'
                        type={isConfirmPasswordVisible
                            ? 'text'
                            : 'password'
                        }
                        value={formData.confirm_password}  // Vinculando o valor ao estado
                        onChange={handleChange}  // Atualizando o estado ao digitar
                        required
                    />
                    <button
                        className='absolute right-1 text-blue-400 hover:text-blue-600 duration-500'
                        type='button'
                        title={isConfirmPasswordVisible
                            ? 'Não Mostrar Senha'
                            : 'Mostrar Senha'
                        }
                        onClick={toggleConfirmPasswordVisibility}
                    >
                        <Icons icon={isConfirmPasswordVisible
                            ? 'fa-solid fa-eye-slash'
                            : 'fa-solid fa-eye'
                        }
                        />
                    </button>
                </div>
                {errors.password && (
                    <p className='text-red-500 text-sm pl-2'>
                        {errors.password}
                    </p>
                )}
            </div>
            
            <SubmitButton disabled={pending || Object.keys(errors).length > 0}>
                Atualizar Senha
            </SubmitButton>
        </Form>
    );
};