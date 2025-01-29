import { TypeButtonProps } from '@/components/interfaces/interfaces';

export default function DangerButton({
    type = 'button',
    className = '',
    disabled = false, // Certifique-se de que 'disabled' tenha um valor padrão de false
    children,
    ...props
}: TypeButtonProps) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-1 
                text-xs tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 
                focus:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 
                active:bg-red-700 mx-auto ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
                ${className}`} // Adicionar condicionalmente estilos de opacidade e cursor quando desativado
            disabled={disabled}  // Passe o objeto 'disabled' para o botão
        >
            {children}
        </button>
    );
};