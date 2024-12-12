import { z } from 'zod';

export const SignupFormSchema = z.object({
    cpf: z
        .string()
        .min(11, { message: 'O cpf deve ter 11 números.' })  // O cpf deve ter 11 números
        .regex(/^\d{11}$/, { message: 'Deve conter apenas números.' }) // Valida que o CPF tenha 11 dígitos
        .trim(), // Remover espaços à esquerda e à direita
    dateofbirth: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' }) // Preemchar o campo
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
    email: z.string()
        .min(1, { message: 'Campo Obrigatório.' }) // Preemchar o campo
        .email({ message: 'Insira um e-mail válido.' })  // O e-mail deve ser válido
        .trim(),
    phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })  // O nome deve ter pelo menos 8 números
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })  // Deve conter apenas números
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
        .min(1, { message: 'Campo Obrigatório.' }) // Preemchar o campo
        .trim(),  // Remover espaços à esquerda e à direita
    email: z.string().email({ message: 'Insira um e-mail válido.' }) // Inserir E-mail válido
        .min(1, { message: 'Campo Obrigatório.' }) // Preemchar o campo
        .trim(),  // Remover espaços à esquerda e à direita
    password: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' }) // Preemchar o campo
        .trim(),  // Remover espaços à esquerda e à direita
});

export const UpdatePasswordFormSchema = z.object({
    old_password: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })  // Campo Obrigatório
        .trim(),  // Remover espaços à esquerda e à direita
    password: z
        .string()
        .min(8, { message: 'Ter pelo menos 8 caracteres' })  // A senha deve ter pelo menos 8 caracteres
        .regex(/[a-zA-Z]/, { message: 'Conter pelo menos uma letra.' })  // Deve conter pelo menos uma letra
        .regex(/[0-9]/, { message: 'Conter pelo menos um número.' })  // Deve conter pelo menos um número
        .regex(/[^a-zA-Z0-9]/, { message: 'Conter pelo menos um caractere especial.' })  // Deve conter pelo menos um caractere especial
        .trim(),  // Remover espaços à esquerda e à direita
});

export const UpdateEmailFormSchema = z.object({
    old_email: z
        .string()
        .min(1, { message: 'Campo Obrigatório' })  // Campo Obrigatório
        .trim(),  // Remover espaços à esquerda e à direita
    email: z.string()
        .email({ message: 'Insira um e-mail válido.' })  // O e-mail deve ser válido
        .trim(),
});

export const UpdatePhoneFormSchema = z.object({
    old_phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })  // O telefone deve ter pelo menos 8 números
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })  // Deve conter apenas números
        .trim(), // Remover espaços à esquerda e à direita
    phone: z
        .string()
        .min(8, { message: 'O telefone deve ter pelo menos 8 números.' })  // O telefone deve ter pelo menos 8 números
        .regex(/^\d+$/, { message: 'O telefone deve conter apenas números.' })  // Deve conter apenas números
        .trim(), // Remover espaços à esquerda e à direita
});

export const CreateBidFormSchema = z.object({
    amount: z
        .string()  // Mantém como string
        .min(4, { message: 'O valor do lance deve ter pelo menos 4 dígitos. ' })  // Garantir que o número tenha pelo menos 4 caracteres (dígitos)
        .max(999999999, { message: 'O valor do lance não pode ser maior que 999.999.999. ' })  // Limitar a um valor máximo
        .regex(/^\d{1,3}(\.\d{3})*(,\d{1,2})?$/, { message: 'O valor deve ser um número válido, como 0,00 ou 1.000,00. ' })  // Aceita números com até 2 casas decimais
        .refine((value) => {
            const parsedValue = value.replace(',', '.');  // Ajusta o valor para facilitar a comparação
            const isValidNumber = !isNaN(parseFloat(parsedValue)) && parseFloat(parsedValue) >= 0;
            return isValidNumber;
        }, { message: 'O valor deve ser um número válido e não pode ser negativo.' }),
    cryptocurrency: z
        .string()
        .min(1, { message: 'Campo Obrigatório.' })  // Campo obrigatório
        .trim(),  // Remover espaços à esquerda e à direita
});