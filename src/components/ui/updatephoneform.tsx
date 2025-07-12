'use client';

import SubmitButton from '@/components/buttons/submitbutton';
import { useActionState, useEffect, useState } from 'react';
import Form from 'next/form';
import { FormErrors } from '@/components/types/types';
import { UpdatePhone } from '@/app/actions/updatephone';
import { toast } from 'sonner';

export default function UpdatePhoneUserForm() {
    const [state, action, pending] = useActionState(UpdatePhone, undefined);

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
                    tabIndex={1}
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
                    tabIndex={2}
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
                    tabIndex={3}
                    value={formData.confirm_phone}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    required
                />
                {errors.phone && (
                    <p className='text-red-500 text-sm pl-2'>{errors.phone}</p>
                )}
            </div>

            <SubmitButton disabled={pending || Object.keys(errors).length > 0} tabIndex={4}>
                Atualizar Telefone
            </SubmitButton>
        </Form>
    );
}