import AppLayoutTemplate from '@/components/layouts/app/app-sidebar-layout';
import { getUser } from '@/lib/dal';
import { AppLayoutProps, User } from '@/types';
import { redirect } from 'next/navigation';

export default async function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const user = await getUser()
    if (!user) return redirect('/logout');
    return (
        <AppLayoutTemplate user={user as User} breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}