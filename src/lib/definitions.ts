import { z, object, string, email } from 'zod';
import { getCheckedCpf } from './cpfValidation';

export const createAdminSchema = object({
    name: string()
        .min(1, 'ErrorsZod.NameRequired'),
    cpf: string()
        .min(11, { message: 'ErrorsZod.CpfRequired' })
        .regex(/^\d{11}$/, { message: 'ErrorsZod.CpfTypeRequired' })
        .trim()
        .refine((cpf) => getCheckedCpf(cpf), {
            message: 'ErrorsZod.CpfVerifiqued',
        }),
    dateofbirth: string()
        .min(1, { message: 'ErrorsZod.DateofbirthRequired' })
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            { message: 'ErrorsZod.DateofbirthVerifiqued' }
        )
        .refine((date) => {
            const dateObj = new Date(date);
            return (
                dateObj instanceof Date &&
                !isNaN(dateObj.getTime()) &&
                dateObj.toISOString().slice(0, 10) === date
            );
        }, { message: 'ErrorsZod.DateofbirthInvalid' })
        .transform((val) => val.trim()),
    username: string()
        .min(1, { message: 'ErrorsZod.UsernameRequired' }),
    phone: string()
        .min(8, { message: 'ErrorsZod.PhoneRequired' })
        .regex(/^\d+$/, { message: 'ErrorsZod.PhoneVerifiqued' })
        .trim(),
    email: email('ErrorsZod.EmailInvalid'),
    confirm_email: email('ErrorsZod.EmailInvalid'),
    password: string()
        .min(8, 'ErrorsZod.PasswordMin'),
    password_confirmation: string()
        .min(1, 'ErrorsZod.PasswordConfirmRequired')
})
    .refine((data) => data.email === data.confirm_email, {
        message: 'ErrorsZod.EmaildMatch',
        path: ['confirm_email']
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'ErrorsZod.PasswordMatch',
        path: ['password_confirmation']
    });

export function getSignUpUpdateSchema(formData: FormData) {
    const isEdit = Boolean(formData.get('id'));

    return object({
        name: string().min(1, 'ErrorsZod.NameRequired'),
        cpf: string()
            .min(11, { message: 'ErrorsZod.CpfRequired' })
            .regex(/^\d{11}$/, { message: 'ErrorsZod.CpfTypeRequired' })
            .trim()
            .refine((cpf) => getCheckedCpf(cpf), {
                message: 'ErrorsZod.CpfVerifiqued',
            }),
        dateofbirth: string()
            .min(1, { message: 'ErrorsZod.DateofbirthRequired' })
            .regex(
                /^\d{4}-\d{2}-\d{2}$/,
                { message: 'ErrorsZod.DateofbirthVerifiqued' }
            )
            .refine((date) => {
                const dateObj = new Date(date);
                return (
                    dateObj instanceof Date &&
                    !isNaN(dateObj.getTime()) &&
                    dateObj.toISOString().slice(0, 10) === date
                );
            }, { message: 'ErrorsZod.DateofbirthInvalid' })
            .transform((val) => val.trim()),
        username: string()
            .min(1, { message: 'ErrorsZod.UsernameRequired' }),
        phone: string()
            .min(8, { message: 'ErrorsZod.PhoneRequired' })
            .regex(/^\d+$/, { message: 'ErrorsZod.PhoneVerifiqued' })
            .trim(),
        email: email('ErrorsZod.EmailInvalid'),
        confirm_email: email('ErrorsZod.EmailInvalid'),
        password: isEdit
            ? string().optional()
            : string().min(8, 'ErrorsZod.PasswordMin'),
        password_confirmation: isEdit
            ? string().optional()
            : string().min(1, 'ErrorsZod.PasswordConfirmRequired'),
        role: z.enum(['ADMIN', 'USER'], {
            error: 'ErrorsZod.RoleRequiredAdminUser',
        })
    })
        .superRefine((data, ctx) => {
            if (data.password && data.password !== data.password_confirmation) {
                ctx.addIssue({
                    path: ['password_confirmation'],
                    code: 'custom',
                    message: 'ErrorsZod.PasswordMatch',
                });
            }
            if (data.email && data.email !== data.confirm_email) {
                ctx.addIssue({
                    path: ['confirm_email'],
                    code: 'custom',
                    message: 'ErrorsZod.EmaildMatch',
                });
            }
        });
}

export const signInSchema = object({
    email: email('ErrorsZod.EmailInvalid'),
    username: string()
        .min(1, 'ErrorsZod.UsernameRequired'),
    password: string()
        .min(8, 'ErrorsZod.PasswordRequired')
        .max(32, 'ErrorsZod.PasswordMax')
})

export const updateUserSchema = object({
    name: string()
        .min(1, 'ErrorsZod.NameRequired'),
    username: string()
        .min(1, 'ErrorsZod.UsernameRequired'),
    email: email('ErrorsZod.EmailInvalid')
})

export const deleteUserSchema = object({
    password: string()
        .min(8, 'ErrorsZod.PasswordMin')
})

export const passwordUpdateSchema = object({
    current_password: string()
        .min(8, 'ErrorsZod.PasswordCurrentMin'),
    password: string()
        .min(8, 'ErrorsZod.PasswordMin'),
    password_confirmation: string()
        .min(8, 'ErrorsZod.PasswordConfirmRequired')
})
    .refine((data) => data.password === data.password_confirmation, {
        message: 'ErrorsZod.PasswordMatch',
        path: ['password_confirmation']
    });

export const passwordResetSchema = object({
    email: email('ErrorsZod.EmailInvalid'),
    token: string()
        .min(1, 'ErrorsZod.TokenRequired'),
    password: string()
        .min(8, 'ErrorsZod.PasswordMin'),
    password_confirmation: string()
        .min(1, 'ErrorsZod.PasswordConfirmRequired')
})
    .refine((data) => data.password === data.password_confirmation, {
        message: 'ErrorsZod.PasswordMatch',
        path: ['password_confirmation']
    });

export const passwordForgotSchema = object({
    email: email('ErrorsZod.EmailInvalid')
});

export const CreateBidFormSchema = object({
    amount: string()
        .min(4, { message: 'ErrorsZod.AmountRequest ' })
        .max(999999999, { message: 'ErrorsZod.AmountMaxt ' })
        .regex(/^\d{1,3}(\.\d{3})*(,\d{2})?$/, { message: 'ErrorsZod.FormatMessage ' })
        .refine((value) => {
            const parsedValue = value.replace(',', '.');
            const isValidNumber = !isNaN(parseFloat(parsedValue)) && parseFloat(parsedValue) >= 0;
            return isValidNumber;
        }, { message: '' }),
    paymentID: string()
        .min(1, { message: 'ErrorsZod.Paymentid' })
        .trim(),
    cryptocurrency: string()
        .min(1, { message: 'ErrorsZod.Cryptocurrency' })
        .trim(),
});

export type FormStateCreateAdmin =
    | {
        errors?: {
            name?: string[];
            cpf?: string[];
            dateofbirth?: string[];
            username?: string[];
            email?: string[];
            confirm_email?: string[];
            phone?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: boolean;
        warning?: string;
    } | undefined;

export type FormStateCreateUpdateAdminUser =
    | {
        errors?: {
            name?: string[];
            cpf?: string[];
            dateofbirth?: string[];
            username?: string[];
            email?: string[];
            confirm_email?: string[];
            phone?: string[];
            role?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: boolean;
    } | undefined;

export type FormStateLoginUser =
    | {
        errors?: {
            email?: string[];
            username?: string[];
            password?: string[];
        }
        message?: string;
        warning?: string;
    } | undefined;

export type FormStateUserDelete =
    | {
        errors?: {
            password?: string[];
        }
        message?: boolean;
    } | undefined;

export type FormStatePasswordUpdate =
    | {
        errors?: {
            current_password?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: boolean;
    } | undefined;

export type FormStateUserUpdate =
    | {
        errors?: {
            name?: string[];
            email?: string[];
        };
        message?: string;
        success?: boolean;
    } | undefined;

export type FormStatePasswordForgot =
    | {
        errors?: {
            email?: string[];
        }
        message?: string;
    } | undefined;

export type FormStatePasswordReset =
    | {
        errors?: {
            email?: string[];
            token?: string[];
            password?: string[];
            password_confirmation?: string[];
        }
        message?: string;
        warning?: string;
    } | undefined;

export type FormStateCriptoUp =
    | {
        errors?: {
            amount?: string[];
            paymentID?: string[];
            cryptocurrency?: string[];
        }
        message?: string;
    } | undefined;