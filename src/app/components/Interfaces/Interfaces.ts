import { ReactNode } from "react";

// Tipagem da função getBitcoinData
export interface BitcoinData {
    timestamp: number; // O carimbo de data/hora do ponto de dados do Bitcoin (geralmente em milissegundos)
    price: number; // O preço do Bitcoin nesse carimbo de data/hora (em USD)
};

// Tipo dos dados retornados pela API
export interface ApiResponse {
    prices: Array<[number, number]>; // Array de tuplas [timestamp, price]
};

export interface SubmitButtonProps {
    children: ReactNode;  // Tipando a prop 'children'
    disabled?: boolean;  // Definindo 'disabled' como opcional
    className?: string;   // Definindo 'className' como opcional
};

export interface IconProps {
    icon: string; // O nome da classe de ícones para um Font Awesome ou qualquer biblioteca de ícones (por exemplo, 'fa-solid fa-eye')
    className?: string; // Nome de classe opcional para adicionar estilo personalizado
};