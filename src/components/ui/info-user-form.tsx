'use client';

import { UserData } from '@/app/actions/userdata';
import {
    useEffect,
    useState
} from 'react';
import { formatCPF } from '@/components/ts/formatcpf';

export default function UserDataForm() {
    const [formData, setFormData] = useState({
        cpf: '',
        dateofbirth: '',
        name: '',
    });

    const [loading, setLoading] = useState(true);

    // Função para atualizar o valor dos campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Carregar dados do usuário assim que o componente for montado
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await UserData();

            // Verificando se existe dados de usuário
            if (userData?.existingUser) {
                const { cpf, dateofbirth, name } = userData.existingUser;
                setFormData({
                    cpf: formatCPF(cpf),  // Aplica a formatação no CPF
                    dateofbirth,
                    name,
                });
            };
            setLoading(false);
        };

        fetchUserData();
    }, []);

    // Enquanto os dados estão sendo carregados, mostre um loading (ou outro componente)
    if (loading) {
        return <div>Carregando...</div>;
    };
    return (
        <form className='w-full flex flex-col gap-5'>
            <div className='min-w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='cpf'
                >
                    CPF
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border cursor-not-allowed'
                    id='cpf'
                    name='cpf'
                    placeholder='CPF'
                    type='text'
                    value={formData.cpf}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    disabled
                />
            </div>

            <div className='min-w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='dateofbirth'
                >
                    Data de Nascimento
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border cursor-not-allowed'
                    id='dateofbirth'
                    name='dateofbirth'
                    placeholder='Data de Nascimento'
                    type='date'
                    value={formData.dateofbirth}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    disabled
                />
            </div>

            <div className='min-w-full flex flex-col'>
                <label
                    className='text-xs'
                    htmlFor='name'
                >
                    Nome do Completo
                </label>
                <input
                    className='w-full rounded py-0.5 px-2 border cursor-not-allowed'
                    id='name'
                    name='name'
                    placeholder='Nome Completo'
                    type='text'
                    value={formData.name}  // Vinculando o valor ao estado
                    onChange={handleChange}  // Atualizando o estado ao digitar
                    disabled
                />
            </div>
        </form>
    );
};