'use client';

import SubmitButton from '@/components/buttons/submitbutton';
import { useActionState, useEffect, useState } from 'react';
import Form from 'next/form';
import { FormErrors } from '@/components/types/types';
import { UpdateEmail } from '@/app/actions/updateemail';
import { toast } from 'sonner';

export default function UpdateEmailUserForm() {
    const [state, action, pending] = useActionState(UpdateEmail, undefined);

    // Estado para os valores dos campos
    const [formData, setFormData] = useState({
        old_email: '',
        email: '',
        confirm_email: '',
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

        return errors;
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setFormData({
            old_email: '',
            email: '',
            confirm_email: '',
        });
    };

    const errors = validateForm();

    useEffect(() => {
        if (state?.message) {
            toast.success('Sucesso!', {
                description: state.message,
                style: { borderColor: 'green' }
            });

            resetForm(); // Resetando o formulário após sucesso
        };

        if (state?.info) {
            toast.warning('Atenção!', {
                description: state.info,
                style: { borderColor: 'orange' }
            });
        };
    }, [state]);
    return (
        <Form className='w-full flex flex-col gap-5' action={action}>
            <div className='min-w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='old_email'
                >
                    E-mail atual
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='old_email'
                    name='old_email'
                    placeholder='E-mail atual'
                    type='email'
                    tabIndex={5}
                    value={formData.old_email}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
                {state?.errors?.old_email && (
                    <p className='text-red-500 text-sm pl-2'>
                        {state.errors.old_email}
                    </p>
                )}
            </div>

            <div className='min-w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='email'
                >
                    E-mail novo
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='email'
                    name='email'
                    placeholder='E-mail novo'
                    type='email'
                    tabIndex={6}
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
                    className='text-xs'
                    htmlFor='confirm_email'
                >
                    Confirmar E-mail novo
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border'
                    id='confirm_email'
                    name='confirm_email'
                    placeholder='Confirmar E-mail novo'
                    type='email'
                    tabIndex={7}
                    value={formData.confirm_email}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
                {errors.email && (
                    <p className='text-red-500 text-sm pl-2'>{errors.email}</p>
                )}
            </div>

            <SubmitButton disabled={pending || Object.keys(errors).length > 0} tabIndex={8}>
                Atualizar E-mail
            </SubmitButton>
        </Form>
    );
}