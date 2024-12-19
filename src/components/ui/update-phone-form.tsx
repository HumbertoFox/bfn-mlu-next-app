'use client';

import SubmitButton from '@/components/buttons/submitbutton';
import {
    useActionState,
    useEffect,
    useState
} from 'react';
import { useFormStatus } from 'react-dom';
import Form from 'next/form';
import { FormErrors } from '@/components/types/types';
import { Toast } from '@/components/ts/sweetalert';
import { UpdatePhone } from '@/app/actions/updatephone';

export default function UpdatePhoneUserForm() {
    const { pending } = useFormStatus();
    const [state, action] = useActionState(UpdatePhone, undefined);

    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        old_phone: '',
        phone: '',
        confirm_phone: '',
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

        // Verificação de phone
        if (formData.phone !== formData.confirm_phone) {
            errors.phone = 'Os telefones não coincidem';
        };

        return errors;
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setFormData({
            old_phone: '',
            phone: '',
            confirm_phone: '',
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
        };
    }, [state]);
    return (
        <Form className='w-full flex flex-col gap-5' action={action}>
            <div className='min-w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='old_phone'
                >
                    Telefone atual
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='old_phone'
                    name='old_phone'
                    placeholder='Telefone atual'
                    type='tel'
                    value={formData.old_phone}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
                {state?.errors?.old_phone && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.old_phone}
                    </p>
                )}
            </div>

            <div className='min-w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='phone'
                >
                    Telefone novo
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='phone'
                    name='phone'
                    placeholder='Telefone novo'
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
                    className='text-xs'
                    htmlFor='confirm_phone'
                >
                    Confirmar Telefone novo
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='confirm_phone'
                    name='confirm_phone'
                    placeholder='Confirmar Telefone novo'
                    type='tel'
                    value={formData.confirm_phone}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
                {errors.phone && (
                    <p className='text-red-500 text-sm pl-2'>{errors.phone}</p>
                )}
            </div>

            <SubmitButton disabled={pending || Object.keys(errors).length > 0}>
                Atualizar Telefone
            </SubmitButton>
        </Form>
    );
};