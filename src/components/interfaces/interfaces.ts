import { ReactNode } from 'react';

// Tipagem da função getBitcoinData
export interface BitcoinDataProps {
    timestamp: number; // O carimbo de data/hora do ponto de dados do Bitcoin (geralmente em milissegundos)
    price: number; // O preço do Bitcoin nesse carimbo de data/hora (em USD)
};

// Tipo dos dados retornados pela API
export interface ApiResponseProps {
    prices: Array<[number, number]>; // Array de tuplas [timestamp, price]
};

export interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;  // Tipando a prop 'children'
    disabled?: boolean;  // Definindo 'disabled' como opcional
    className?: string;   // Definindo 'className' como opcional
};

export interface TypeButtonProps extends SubmitButtonProps {
    type?: 'button' | 'submit' | 'reset';  // Tipando corretamente o 'type'
};

export interface IconsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: string | any; // O nome da classe de ícones para um Font Awesome ou qualquer biblioteca de ícones (por exemplo, 'fa-solid fa-eye')
    className?: string; // Nome de classe opcional para adicionar estilo personalizado
    title?: string; // Torna title opcional
};

export interface SessionPayload {
    user_id?: string;
    username: string;
    email?: string;
    role?: string;
    [key: string]: unknown; // Caso precise de flexibilidade para adicionar mais propriedades no futuro
};

export interface CryptoData {
    valueBRL: number;
    valueUSD: number;
    bids: number;
    date: string;
};

export interface CryptosPricesProps {
    bitcoin: { brl: number, usd: number };
    ethereum: { brl: number, usd: number };
    binancecoin: { brl: number, usd: number };
};

export interface CriptoUpFormProps {
    cryptocurrency: string;
    onClose: () => void;  // Função para fechar o formulário
};

export interface UsernameProps {
    user: string | null;
    isadmin: boolean;
};

export interface TermComponentProps {
    checked: boolean;
    handleTerm: () => void;
    handleChecked: () => void;
}