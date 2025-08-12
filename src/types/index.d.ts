import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface User {
    id: string;
    name: string;
    cpf: string;
    dateofbirth: string;
    username: string;
    email: string;
    phone: string;
    image?: string;
    emailVerified: Date | null;
    role: string;
    [key: string]: unknown;
}

export interface BitcoinDataProps {
    timestamp: number;
    price: number;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export interface TermComponentProps {
    checked: boolean;
    handleTerm: () => void;
    handleChecked: () => void;
}

export interface CriptoUpFormProps {
    cryptocurrency: string;
    onClose: () => void;
}

export type CryptoData = {
    id: string;
    amount: string;
}

export type ShowBidsProps = {
    bitcoins: CryptoData[];
    ethereums: CryptoData[];
    binancecoins: CryptoData[];
}