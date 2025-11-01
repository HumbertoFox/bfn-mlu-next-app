'use client';

import { useEffect } from 'react';
import { useBreadcrumbs } from '@/context/breadcrumb-context';
import { type User } from '@/types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function UpdateUserBreadcrumb({ user }: { user: User }) {
    const router = useRouter();
    const { setBreadcrumbs } = useBreadcrumbs();
    const tb = useTranslations('Breadcrumb');
    useEffect(() => {
        if (user) {
            setBreadcrumbs([
                { title: tb('Dashboard'), href: '/dashboard' },
                { title: tb('Administrators'), href: '/dashboard/admins' },
                { title: user?.name ? `${tb('Update')} ${user.name}` : tb('UpdateUser'), href: `/dashboard/admins/update/${user.id}` }
            ]);
        };
        router.back();
    }, [setBreadcrumbs, user, tb, router]);

    return null;
}