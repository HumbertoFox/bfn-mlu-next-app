'use client'; // Indique que este componente é um componente cliente

import { useEffect, useState } from 'react';
import TypetButton from '../components/buttons/typebutton';
import { destroySession } from '../lib/removecookies';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Função para lidar com logout
    const handleLogout = async () => {
        setLoading(true); // Defina o carregamento como verdadeiro durante o processamento do logout
        try {
            const success = await destroySession();
            if (success) {
                // Redirecionar o usuário para um login ou página inicial
                router.push('/login'); // Ou onde você gostaria que o usuário fosse após o logout
            } else {
                console.error('Falha no logout');
            };
        } catch (error) {
            console.error('Erro durante o logout', error);
        } finally {
            setLoading(false); // Defina o carregamento como falso após o processo
        }
    };

    useEffect(() => {
        // Como os cookies só podem ser acessados no cliente, você pode obtê-los aqui
        const user = document.cookie.replace(
            /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
            '$1',
        );
        setUsername(user || null);
    }, []);

    return (
        <div className='w-full min-h-svh flex flex-col items-center p-2'>
            <div className='w-full h-full max-w-2xl flex flex-col gap-8 items-center lg:max-w-7xl'>
                <header className='w-full'>
                    <div className='flex flex-col text-center gap-1'>
                        {username && (
                            <span>
                                Olá, {username}!
                            </span>
                        )}
                        <TypetButton
                            onClick={handleLogout}
                            disabled={loading}
                        >
                            {loading ? 'Saindo...' : 'Sair'}
                        </TypetButton>
                    </div>
                </header>
                <main className='w-full h-full flex flex-col gap-8 items-center'>
                    <h1>Painel</h1>
                </main>
            </div>
        </div>
    );
}