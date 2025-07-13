import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cookies } from 'next/headers';
import HeaderComponents from '@/components/headers';
import { Toaster } from '@/components/ui/sonner';
import db from './lib/db';
import { openSessionToken } from './lib/opentoken';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Menor Lance Único',
  description: 'Criptos Coins Agents',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // verifica no banco se existe um usuário com role ADMIN
  const existingUserAdmin = await db.user.findFirst({ where: { role: 'ADMIN' } });
  // Verifica se o cookies existe valor
  const sessionCookie = (await cookies()).get('sessionAuthToken')?.value;
  let isUserAdmin = false;
  let existingAdmin = false;

  if (sessionCookie) {
    const payload = await openSessionToken(sessionCookie);

    if (payload) isUserAdmin = payload.role === 'ADMIN';
  };

  if (existingUserAdmin) existingAdmin = true;

  // Acessa os cookies para pegar as informações do usuário
  // Verificando username no cookies
  const userCookie = (await cookies()).get('username');
  // Se user estiver no cookies envia o nome para a contante "user" se não envia "null"
  const user = userCookie ? userCookie.value : null;

  return (
    <html lang='pt-BR'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderComponents user={user} isuseradmin={isUserAdmin} existingadmin={existingAdmin} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}