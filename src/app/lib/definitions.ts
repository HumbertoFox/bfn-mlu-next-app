import { z } from 'zod';

export const SignupFormSchema = z.object({
    cpf: z
        .string()
        .min(11, { message: 'O cpf deve ter 11 números.' })  // O cpf deve ter 11 números
        .regex(/^\d{11}$/, { message: 'Deve conter apenas números.' }) // Valida que o CPF tenha 11 dígitos
        .trim(), // Remover espaços à esquerda e à direita
    dateofbirth: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            { message: 'Formato esperado: YYYY-MM-DD.' }
        ) // Valida se está no formato YYYY-MM-DD
        .refine((date) => {
            const dateObj = new Date(date);
            return (
                dateObj instanceof Date &&
                !isNaN(dateObj.getTime()) &&  // Verifica se a data é válida
                dateObj.toISOString().slice(0, 10) === date  // Verifica se o formato corresponde
            );
        }, { message: 'Data de nascimento inválida.' })
        .transform((val) => val.trim()), // Aplica o trim antes de outras validações
    name: z
        .string()
        .min(10, { message: 'O nome deve ter pelo menos 10 letras.' })  // O nome deve ter pelo menos 10 letras
        .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras e espaços.' })  // Deve conter apenas letras
        .trim(), // Remover espaços à esquerda e à direita
    username: z
        .string()
        .min(5, { message: 'O nome do usuário deve ter pelo menos 5 caracteres.' })  // O nome deve ter pelo menos 5 caracteres
        .trim(), // Remover espaços à esquerda e à direita
    email: z.string().email({ message: 'Insira um e-mail válido.' })
        .trim(),  // O e-mail deve ser válido
    phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })  // O nome deve ter pelo menos 8 números
        .trim(), // Remover espaços à esquerda e à direita
    password: z
        .string()
        .min(8, { message: 'Ter pelo menos 8 caracteres' })  // A senha deve ter pelo menos 8 caracteres
        .regex(/[a-zA-Z]/, { message: 'Conter pelo menos uma letra.' })  // Deve conter pelo menos uma letra
        .regex(/[0-9]/, { message: 'Conter pelo menos um número.' })  // Deve conter pelo menos um número
        .regex(/[^a-zA-Z0-9]/, { message: 'Conter pelo menos um caractere especial.' })  // Deve conter pelo menos um caractere especial
        .trim(),  // Remover espaços à esquerda e à direita
});

export const SigninFormSchema = z.object({
    username: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' }), // Preemchar o campo
    email: z.string().email({ message: 'Insira um e-mail válido.' }) // Inserir E-mail válido
        .min(1, { message: 'Campo Obrigatório.' }), // Preemchar o campo
    password: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' }), // Preemchar o campo
});