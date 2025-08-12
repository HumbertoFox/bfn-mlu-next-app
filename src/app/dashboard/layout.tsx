import { BreadcrumbProvider } from '@/context/breadcrumb-context';
import AppLayout from '@/components/layouts/app-layout';
import { ReactNode } from 'react';
import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const user = await getUser()
    if (!user) return redirect('/logout');
    return (
        <BreadcrumbProvider>
            <AppLayout>{children}</AppLayout>
        </BreadcrumbProvider>
    );
}