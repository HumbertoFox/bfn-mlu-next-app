'use client';

import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { ChangeEvent, FormEvent, startTransition, useActionState, useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { createUpdateAdminUser } from '@/app/api/actions/createupdateadminuser';
import { useTranslations } from 'next-intl';

type UserProps = {
    id: string;
    name: string;
    cpf: string;
    dateofbirth: string;
    username: string;
    email: string;
    phone: string;
    role: string;
}

type RegisterForm = UserProps & {
    confirm_email: string;
    password: string;
    password_confirmation: string;
};

type RegisterFormProps = {
    user?: UserProps;
    isEdit?: boolean;
    valueButton?: string;
}

export default function RegisterUserForm({ user, isEdit, valueButton }: RegisterFormProps) {
    const router = useRouter();
    const t = useTranslations('RegisterUserForm');
    const [state, action, pending] = useActionState(createUpdateAdminUser, undefined);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
    const [data, setData] = useState<RegisterForm>({
        id: user?.id ?? '',
        name: user?.name ?? '',
        cpf: user?.cpf ?? '',
        dateofbirth: user?.dateofbirth ?? '',
        username: user?.username ?? '',
        email: user?.email ?? '',
        confirm_email: '',
        phone: user?.phone ??'',
        role: user?.role ?? 'USER',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };
    const toggleShowPassword = () => setShowPassword(prev => !prev);
    const toggleShowPasswordConfirm = () => setShowPasswordConfirm(prev => !prev);
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => action(formData));
    };
    useEffect(() => {
        if (state?.message) {
            const { role } = data;

            if (valueButton === 'Register') {
                setData({
                    id: '',
                    name: '',
                    cpf: '',
                    dateofbirth: '',
                    username: '',
                    email: '',
                    confirm_email: '',
                    phone: '',
                    password: '',
                    role: 'USER',
                    password_confirmation: '',
                });
            }

            if (role === 'USER') {
                router.push('/dashboard/admins/users');
            } else {
                router.push('/dashboard/admins');
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    return (
        <form className="w-full max-w-96 flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
                {isEdit && (
                    <div className="grid gap-2">
                        <Label htmlFor="id">{t('IdLabel')}</Label>
                        <Input
                            id="id"
                            name="id"
                            type="text"
                            required={isEdit}
                            autoComplete="id"
                            value={data.id}
                            onChange={handleChange}
                            disabled={pending}
                            readOnly
                            placeholder="ID"
                            className="cursor-default"
                        />
                    </div>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="name">{t('NameLabel')}</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={data.name}
                        onChange={handleChange}
                        disabled={pending}
                        placeholder={t('NamePlaceholder')}
                    />
                    {state?.errors?.name && <InputError message={t(state.errors.name[0])} />}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="cpf">{t('CpfLabel')}</Label>
                    <Input
                        id="cpf"
                        name="cpf"
                        type="text"
                        required
                        tabIndex={2}
                        autoComplete="cpf"
                        value={data.cpf}
                        onChange={handleChange}
                        disabled={pending}
                        placeholder={t('CpfPlaceholder')}
                    />
                    {state?.errors?.cpf && <InputError message={t(state.errors.cpf[0])} />}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="dateofbirth">{t('DateofbirthLabel')}</Label>
                    <Input
                        id="dateofbirth"
                        name="dateofbirth"
                        type="date"
                        required
                        tabIndex={3}
                        autoComplete="dateofbirth"
                        value={data.dateofbirth}
                        onChange={handleChange}
                        disabled={pending}
                    />
                    {state?.errors?.dateofbirth && <InputError message={t(state.errors.dateofbirth[0])} />}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="username">{t('UsernameLabel')}</Label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        required
                        tabIndex={4}
                        autoComplete="username"
                        value={data.username}
                        onChange={handleChange}
                        disabled={pending}
                        placeholder={t('UsernamePlaceholder')}
                    />
                    {state?.errors?.username && <InputError message={t(state.errors.username[0])} />}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">{t('EmailLabel')}</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        tabIndex={5}
                        autoComplete="email"
                        value={data.email}
                        onChange={handleChange}
                        disabled={pending}
                        placeholder={t('EmailPlaceholder')}
                    />
                    {state?.errors?.email && <InputError message={t(state.errors.email[0])} />}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="confirm_email">{t('Confirm_emailLabel')}</Label>
                    <Input
                        id="confirm_email"
                        name="confirm_email"
                        type="email"
                        required
                        tabIndex={6}
                        autoComplete="confirm_email"
                        value={data.confirm_email}
                        onChange={handleChange}
                        disabled={pending}
                        placeholder={t('Confirm_emailPlaceholder')}
                    />
                    {state?.errors?.confirm_email && <InputError message={t(state.errors.confirm_email[0])} />}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">{t('PhoneLabel')}</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        tabIndex={7}
                        autoComplete="phone"
                        value={data.phone}
                        onChange={handleChange}
                        disabled={pending}
                        placeholder={t('PhonePlaceholder')}
                    />
                    {state?.errors?.phone && <InputError message={t(state.errors.phone[0])} />}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">{t('PasswordLabel')}</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required={!data.id}
                            tabIndex={8}
                            value={data.password}
                            onChange={handleChange}
                            disabled={pending}
                            placeholder={t('PasswordPlaceholder')}
                        />
                        <button
                            type="button"
                            className='absolute right-2 top-[6px] opacity-30 hover:opacity-100 duration-300 cursor-pointer'
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <Icon iconNode={Eye} /> : <Icon iconNode={EyeClosed} />}
                        </button>
                    </div>
                    {state?.errors?.password && <InputError message={t(state.errors.password[0])} />}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">{t('ConfirmPasswordLabel')}</Label>
                    <div className="relative">
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type={showPasswordConfirm ? "text" : "password"}
                            required={!data.id}
                            tabIndex={9}
                            value={data.password_confirmation}
                            onChange={handleChange}
                            disabled={pending}
                            placeholder={t('ConfirmPasswordPlaceholder')}
                        />
                        <button
                            type="button"
                            className='absolute right-2 top-[6px] opacity-30 hover:opacity-100 duration-300 cursor-pointer'
                            onClick={toggleShowPasswordConfirm}
                        >
                            {showPasswordConfirm ? <Icon iconNode={Eye} /> : <Icon iconNode={EyeClosed} />}
                        </button>
                    </div>
                    {state?.errors?.password_confirmation && <InputError message={t(state.errors.password_confirmation[0])} />}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="role">{t('RoleLabel')}</Label>
                    <Select
                        required
                        value={data.role}
                        onValueChange={(value) => setData((prev) => ({ ...prev, role: value }))}
                        disabled={pending}
                    >
                        <SelectTrigger
                            id="role"
                            name="role"
                            title={t('RoleTitle')}
                            tabIndex={10}
                        >
                            <SelectValue placeholder={t('RolePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USER">
                                {t('RoleItemUser')}
                            </SelectItem>
                            <SelectItem value="ADMIN">
                                {t('RoleItemAdmin')}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {state?.errors?.role && <InputError message={t(state.errors.role[0])} />}
                </div>
                <input
                    type="hidden"
                    name="role"
                    value={data.role}
                />

                <Button
                    type="submit"
                    tabIndex={11}
                    disabled={pending}
                    aria-busy={pending}
                    className="mt-2 w-full"
                >
                    {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    {valueButton}
                </Button>
            </div>
        </form>
    );
}
