import { useFormStatus } from 'react-dom';
import { SubmitButtonProps } from '@/components/interfaces/interfaces';

export default function SubmitButton({
    className = '',
    disabled = false, // Certifique-se de que 'disabled' tenha um valor padrão de false
    children,
    ...props
}: SubmitButtonProps) {
    const { pending } = useFormStatus(); // Obter status pendente
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-1 
                text-xs tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-500 
                focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 
                active:bg-blue-700 mx-auto ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
                ${className}`} // Adicionar condicionalmente estilos de opacidade e cursor quando desativado
            disabled={pending}  // Passe o objeto 'disabled' para o botão
        >
            {children}
        </button>
    );
};