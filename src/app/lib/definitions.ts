import { z } from 'zod';

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })  // O nome deve ter pelo menos 2 caracteres
        .trim(), // Remover espaços à esquerda e à direita
    email: z.string().email({ message: 'Insira um e-mail válido.' })
    .trim(),  // O e-mail deve ser válido
    password: z
        .string()
        .min(8, { message: 'Ter pelo menos 8 caracteres' })  // A senha deve ter pelo menos 8 caracteres
        .regex(/[a-zA-Z]/, { message: 'Conter pelo menos uma letra.' })  // Deve conter pelo menos uma letra
        .regex(/[0-9]/, { message: 'Conter pelo menos um número.' })  // Deve conter pelo menos um número
        .regex(/[^a-zA-Z0-9]/, { message: 'Conter pelo menos um caractere especial.' })  // Deve conter pelo menos um caractere especial
        .trim(),  // Remover espaços à esquerda e à direita
});