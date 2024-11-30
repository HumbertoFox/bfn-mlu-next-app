import { SignupFormSchema } from '@/app/lib/definitions';
import { FormState } from '../components/types/Types';

export async function signup(state: FormState, formData: FormData) {
    // Validar campos de formulário
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // Se algum campo de formulário for inválido, retorne antecipadamente
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    };

    // Chame o provedor ou banco de dados para criar um usuário...
};