'use client'; // Indique que este componente é um componente cliente

import {
    useEffect,
    useRef,
    useState
} from 'react';
import {
    usePathname,
    useRouter
} from 'next/navigation';
import Image from 'next/image';
import { destroySession } from '@/app/lib/removecookies';
import Icons from '@/components/icons/icons';
import Link from 'next/link';
import { UsernameProps } from '@/components/interfaces/interfaces';

export default function HeaderComponents({ user }: UsernameProps) {
    const router = useRouter();
    const pathname = usePathname();
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
                router.push('/'); // Ou onde você gostaria que o usuário fosse após o logout
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
        // Atualizando estado do Usuário
        setUsername(user || null);

        // Função para fechar o dropdown se o clique fora do dropdown ou botão
        const handleClickOutside = (event: MouseEvent) => {
            const dropDown = dropdownRef.current;
            const buttonIs = buttonRef.current;
            
            if (dropDown && !dropDown.contains(event.target as Node) &&
                buttonIs && !buttonIs.contains(event.target as Node)) {
                setIsOpen(false);
            };
        };

        // Adiciona o evento de clique global
        document.addEventListener('mousedown', handleClickOutside);

        // Limpeza do evento ao desmontar
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [user]);
    return (
        <header className='w-full flex justify-center p-2'>
            <div className='w-full flex justify-between items-center lg:max-w-7xl'>
                <Link
                    className='flex lg:justify-between lg:col-start-2'
                    href={'/'}
                >
                    <svg width='57px' height='57px' viewBox='0.004 0 64 64' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z'
                            fill='#F7931A' />
                        <path
                            d='M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z'
                            fill='#FFFFFF' />
                    </svg>
                </Link>

                {username ? (
                    <div
                        className='relative inline-block text-center bg-white'
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
                            <Icons
                                className={`${isOpen ? '-rotate-180' : ''} duration-500`}
                                icon='fa-solid fa-angle-down'
                            />
                        </button>

                        {isOpen && (
                            <div className='origin-top-right absolute right-0 mt-2 w-24 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10'>
                                <div>
                                    {pathname === '/edituser' && (
                                        <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-400 duration-500'>
                                            <Link
                                                href='/dashboard'
                                                className='w-full flex items-center justify-center gap-2'
                                                title='Perfil'
                                                onClick={closeDropdown}
                                            >
                                                <Icons icon='fa-solid fa-check-to-slot' />
                                                Painel
                                            </Link>
                                        </div>
                                    )}
                                    {pathname !== '/edituser' && (
                                        <div className='block px-4 py-2 text-sm text-gray-700 rounded-t-lg hover:bg-gray-100 hover:text-orange-400 duration-500'>
                                            <Link
                                                href='/edituser'
                                                className='w-full flex items-center justify-center gap-2'
                                                title='Perfil'
                                                onClick={closeDropdown}
                                            >
                                                <Icons icon='fa-solid fa-user-gear' />
                                                Perfil
                                            </Link>
                                        </div>
                                    )}
                                    <div className='block px-4 py-2 text-sm text-gray-700 rounded-b-lg hover:bg-gray-100 hover:text-red-600 duration-500 bg-white'>
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
                ) : (
                    <div className='flex gap-5'>
                        {(pathname === '/signup' || pathname === '/') && (
                            <Link
                                className='text-sm hover:text-blue-700 duration-500'
                                href={'/login'}
                            >
                                Iniciar Sessão
                            </Link>
                        )}

                        {(pathname === '/login' || pathname === '/') && (
                            <Link
                                className='text-sm hover:text-blue-700 duration-500'
                                href={'/signup'}
                            >
                                Cadastrar-se
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}