'use client';

import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/layouts/auth-layout';
import { Icon } from '@/components/ui/icon';
import { createAdmin } from '@/app/api/actions/createadmin';
import { useTranslations } from 'next-intl';
import TextLink from '@/components/text-link';

type RegisterForm = {
    name: string;
    cpf: string;
    dateofbirth: string;
    username: string;
    email: string;
    confirm_email: string;
    phone: string;
    password: string;
    password_confirmation: string;
};

export default function RegisterAdmin() {
    const t = useTranslations('RegisterAdmin');
    const emailRef = useRef<HTMLInputElement>(null);
    const [state, action, pending] = useActionState(createAdmin, undefined);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
    const [data, setData] = useState<RegisterForm>({
        name: '',
        cpf: '',
        dateofbirth: '',
        username: '',
        email: '',
        confirm_email: '',
        phone: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };
    const toggleShowPassword = () => setShowPassword(prev => !prev);
    const toggleShowPasswordConfirm = () => setShowPasswordConfirm(prev => !prev);
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => action(formData));
    };

    useEffect(() => {
        if (state?.message) {
            setData({
                name: '',
                cpf: '',
                dateofbirth: '',
                username: '',
                email: '',
                confirm_email: '',
                phone: '',
                password: '',
                password_confirmation: ''
            });
        };
    }, [state]);
    return (
        <AuthLayout title={t('Title')} description={t('Description')}>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
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
                            ref={emailRef}
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
                                required
                                tabIndex={8}
                                autoComplete="new-password"
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
                                required
                                tabIndex={9}
                                autoComplete="new-password"
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

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                        tabIndex={10}
                        disabled={pending}
                        aria-busy={pending}
                    >
                        {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {t('Submit')}
                    </Button>

                    <div className="text-muted-foreground text-center text-sm">
                        {t('TextLink')}
                        <TextLink href="/login" tabIndex={11}>
                            {t('LinkLogin')}
                        </TextLink>
                    </div>
                </div>
            </form>

            {state?.warning && <div className="mb-4 text-center text-sm font-medium text-orange-400">{t(state.warning)}</div>}
        </AuthLayout>
    );
}