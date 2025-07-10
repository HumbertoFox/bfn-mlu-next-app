import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cookies } from 'next/headers';
import HeaderComponents from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import db from './lib/db';

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
  // Verificando se existe informações do usuário role ADMIN no banco de dados
  const isAdmin = await db.user.findFirst({
    where: { role: 'ADMIN' },
    select: { role: true }
  });
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
        <HeaderComponents user={user} isadmin={isAdmin ? true : false} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}