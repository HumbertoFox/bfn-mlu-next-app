'use client'; // Indique que este componente é um componente cliente

import { useEffect, useRef, useState } from 'react';
import { destroySession } from '../lib/removecookies';
import { useRouter } from 'next/navigation';
import Icons from '../components/icons/icons';
import Image from 'next/image';

export default function Dashboard() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Referência para o botão e dropdown
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Função para lidar com logout
    const handleLogout = async () => {
        setLoading(true); // Defina o carregamento como verdadeiro durante o processamento do logout

        try {
            const success = await destroySession();
            if (success) {
                // Fechar dropdown
                setIsOpen(false);

                // Redirecionar o usuário para um login ou página inicial
                router.push('/login'); // Ou onde você gostaria que o usuário fosse após o logout
            } else {
                console.error('Falha no logout');
            };
        } catch (error) {
            console.error('Erro durante o logout', error);
        } finally {
            setLoading(false); // Defina o carregamento como falso após o processo
        };
    };

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    useEffect(() => {
        // Como os cookies só podem ser acessados no cliente, você pode obtê-los aqui
        const user = document.cookie.replace(
            /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
            '$1',
        );
        setUsername(user || null);

        // Função para fechar o dropdown se o clique for fora do dropdown ou botão
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            };
        };

        // Adiciona o evento de clique global
        document.addEventListener('mousedown', handleClickOutside);

        // Limpeza do evento ao desmontar
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className='w-full min-h-svh flex flex-col items-center p-2'>
            <div className='w-full h-full max-w-2xl flex flex-col gap-8 items-center lg:max-w-7xl'>
                <header className='w-full'>
                    <div className='flex flex-col text-center gap-1'>
                        <div className='flex justify-end'>
                            <div
                                className='relative inline-block text-center'
                                ref={dropdownRef}
                            >
                                <Image
                                    className='mx-auto mb-1'
                                    src={'/images/bitcoin-user.png'}
                                    width={35}
                                    height={35}
                                    alt='Imagem Bit User'
                                />
                                <button
                                    type='button'
                                    className='p-2 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium hover:text-orange-400 rounded-lg text-sm inline-flex items-center gap-2 duration-500'
                                    onClick={toggleDropdown}
                                    ref={buttonRef}
                                >
                                    Olá, {username}
                                    <Icons icon={isOpen
                                        ? 'fa-solid fa-angle-up'
                                        : 'fa-solid fa-angle-down'
                                    }
                                    />
                                </button>

                                {isOpen && (
                                    <div className='origin-top-right absolute right-0 mt-2 w-24 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                                        <div>
                                            <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-400 duration-500'>
                                                <a
                                                    href='#'
                                                    className='w-full flex items-center justify-center gap-2'
                                                    title='Perfil'
                                                    onClick={closeDropdown}
                                                >
                                                    <Icons icon='fa-solid fa-user-gear' />
                                                    Perfil
                                                </a>
                                            </div>
                                            <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 duration-500'>
                                                <button
                                                    className='w-full flex items-center justify-center gap-2'
                                                    type='button'
                                                    title='Sair'
                                                    onClick={handleLogout}
                                                    disabled={loading}
                                                >
                                                    <Icons icon='<fa-solid fa-power-off' />
                                                    {loading
                                                        ? 'Saindo...'
                                                        : 'Sair'
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
                <main className='w-full h-full flex flex-col gap-8 items-center'>
                    <h1>Painel</h1>
                </main>
            </div>
        </div>
    );
}