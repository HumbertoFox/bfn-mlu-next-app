import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cookies } from 'next/headers';
import HeaderComponents from './components/header';

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
  // Acessa os cookies para pegar as informações do usuário
  const userCookie = (await cookies()).get('username'); // Verificando username no cookies
  const user = userCookie ? userCookie.value : null; // Se user estiver no cookies envia o nome para a contante "user" se não envia "null"

  return (
    <html lang='pt-BR'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderComponents user={user} />
        {children}
      </body>
    </html>
  );
}