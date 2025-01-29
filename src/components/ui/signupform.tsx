'use client';

import SubmitButton from '@/components/buttons/submitbutton';
import {
    useActionState,
    useEffect,
    useState
} from 'react';
import Form from 'next/form';
import Icons from '@/components/icons/icons';
import { signup } from '@/app/actions/authup';
import { FormErrors } from '@/components/types/types';
import { Toast } from '@/components/ts/sweetalert';
import { useRouter } from 'next/navigation';
import { signin } from '@/app/actions/authin';

export default function SignUpForm() {
    const router = useRouter();
    const [state, action, pending] = useActionState(signup, undefined);

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        cpf: '',
        dateofbirth: '',
        name: '',
        username: '',
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

    // Função de validação
    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};

        // Verificação de email
        if (formData.email !== formData.confirm_email) {
            errors.email = 'Os e-mails não coincidem';
        };

        // Verificação de senha
        if (formData.password !== formData.confirm_password) {
            errors.password = 'As senhas não coincidem';
        };

        return errors;
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setFormData({
            cpf: '',
            dateofbirth: '',
            name: '',
            username: '',
            email: '',
            phone: '',
            confirm_email: '',
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

            // Cria um novo objeto FormData e anexe os dados do formulário
            const formDataInstance = new FormData();
            for (const [key, value] of Object.entries(formData)) {
                formDataInstance.append(key, value);
            };

            signin(state, formDataInstance); // Passa a instância FormData para signin
            resetForm(); // Resetando o formulário após sucesso
            router.push('/dashboard'); // Direciona para o Painel "Dashboard"
        };

        if (state?.info) {
            Toast.fire({
                icon: 'info',
                title: state.info
            });
        };
    }, [router, state]);
    return (
        <Form className='w-full flex flex-col gap-5' action={action}>
            <div className='min-w-full flex flex-col'>
                <label
                    className='text-sm'
                    htmlFor='cpf'
                >
                    CPF
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='cpf'
                    name='cpf'
                    placeholder='CPF'
                    type='text'
                    value={formData.cpf}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
                {state?.errors?.cpf && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.cpf}
                    </p>
                )}
            </div>

            <div className='min-w-full flex flex-col'>
                <label
                    className='text-sm'
                    htmlFor='dateofbirth'
                >
                    Data de Nascimento
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='dateofbirth'
                    name='dateofbirth'
                    placeholder='Data de Nascimento'
                    type='date'
                    value={formData.dateofbirth}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
                {state?.errors?.dateofbirth && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.dateofbirth}
                    </p>
                )}
            </div>

            <div className='min-w-full flex flex-col'>
                <label
                    className='text-sm'
                    htmlFor='name'
                >
                    Nome do Completo
                </label>
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
                {state?.errors?.name && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.name}
                    </p>
                )}
            </div>

            <div className='min-w-full flex flex-col'>
                <label
                    className='text-sm'
                    htmlFor='username'
                >
                    Nome para Usuário
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='username'
                    name='username'
                    placeholder='Nome para Usuário'
                    type='text'
                    value={formData.username}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
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
                    htmlFor='phone'
                >
                    Telefone
                </label>
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
                {state?.errors?.phone && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.phone}
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
                    value={formData.email}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
                {state?.errors?.email && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.email}
                    </p>
                )}
            </div>

            <div className='min-w-full flex flex-col'>
                <label
                    className='text-sm'
                    htmlFor='confirm_email'
                >
                    Confirmar E-mail
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='confirm_email'
                    name='confirm_email'
                    placeholder='Confirmar E-mail'
                    type='email'
                    value={formData.confirm_email}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
                {errors.email && (
                    <p className='text-red-500 text-sm pl-2'>{errors.email}</p>
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
                    className='text-sm'
                    htmlFor='confirm_password'
                >
                    Confirmar Senha
                </label>
                <div className='relative flex items-center'>
                    <input
                        className='w-full rounded py-0.5 px-2 border'
                        id='confirm_password'
                        name='confirm_password'
                        placeholder='Confirmar Senha'
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
                Cadastrar
            </SubmitButton>
        </Form>
    );
};