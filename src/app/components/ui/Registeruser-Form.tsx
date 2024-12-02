'use client';

import SubmitButton from '@/app/components/Buttons/SubmitButton';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import Icon from '../Icons/Icons';

export default function RegisterUserForm() {
    const { pending } = useFormStatus();

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        cpf: '',
        dateofbirth: '',
        name: '',
        email: '',
        phone: '',
        confirm_email: '',
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

    return (
        <form className='w-full flex flex-col gap-5'>
            <div className='min-w-full flex flex-col'>
                <label htmlFor='cpf'>CPF</label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='cpf'
                    name='cpf'
                    placeholder='CPF'
                    type='number'
                    value={formData.cpf}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
            </div>

            <div className='min-w-full flex flex-col'>
                <label htmlFor='dateofbirth'>Data de Nascimento</label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='dateofbirth'
                    name='dateofbirth'
                    placeholder='Data de Nascimento'
                    type='date'
                    value={formData.dateofbirth}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                />
            </div>

            <div className='min-w-full flex flex-col'>
                <label htmlFor='name'>Nome do Completo</label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='name'
                    name='name'
                    placeholder='Nome Completo'
                    type='text'
                    value={formData.name}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
            </div>

            <div className='min-w-full flex flex-col'>
                <label htmlFor='name'>Nome para Usuário</label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='name'
                    name='name'
                    placeholder='Nome para Usuário'
                    type='text'
                    value={formData.name}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
            </div>

            <div className='min-w-full flex flex-col'>
                <label htmlFor='phone'>Telefone</label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='phone'
                    name='phone'
                    placeholder='Telefone para Contato'
                    type='tel'
                    value={formData.phone}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
            </div>

            <div className='min-w-full flex flex-col'>
                <label htmlFor='email'>E-mail</label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='email'
                    name='email'
                    placeholder='E-mail'
                    type='email'
                    value={formData.email}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
            </div>

            <div className='min-w-full flex flex-col'>
                <label htmlFor='confirm_email'>Confirmar E-mail</label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='confirm_email'
                    name='confirm_email'
                    placeholder='Confirmar E-mail'
                    type='email'
                    value={formData.confirm_email}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                />
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
                        required
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
            </div>

            <div className='min-w-full w-full flex flex-col'>
                <label htmlFor='confirm_password'>Confirmar Senha</label>
                <div className='relative flex items-center'>
                    <input
                        className='w-full rounded py-0.5 px-2 border'
                        id='confirm_password'
                        name='confirm_password'
                        type={isConfirmPasswordVisible
                            ? 'text'
                            : 'password'
                        }
                        value={formData.confirm_password}  // Vinculando o valor ao estado
                        onChange={handleChange}  // Atualizando o estado ao digitar
                        required
                    />
                    <button
                        className='absolute right-1 text-blue-400'
                        type='button'
                        title={isConfirmPasswordVisible
                            ? 'Não Mostrar Senha'
                            : 'Mostrar Senha'
                        }
                        onClick={toggleConfirmPasswordVisibility}
                    >
                        <Icon icon={isConfirmPasswordVisible
                            ? 'fa-solid fa-eye-slash'
                            : 'fa-solid fa-eye'
                        }
                        />
                    </button>
                </div>
            </div>
            <SubmitButton disabled={pending}>
                Cadastrar
            </SubmitButton>
        </form>
    );
};