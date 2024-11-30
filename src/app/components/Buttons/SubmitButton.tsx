import { useFormStatus } from 'react-dom';
import { SubmitButtonProps } from '../Interfaces/Interfaces';

export default function SubmitButton({
    className = '',
    disabled, // Mantendo a prop 'disabled', mas é necessário incluí-la na interface
    children,
    ...props
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-1 text-xs tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 active:bg-blue-700 mx-auto ${pending && 'opacity-25'
                } ` + className
            }
            disabled={disabled || pending}  // Usando o 'disabled' passado ou 'pending'
        >
            {children}
        </button>
    );
};