import 'server-only';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import { SessionPayload } from '@/components/interfaces/interfaces';

export async function createSessionToken(payload: SessionPayload) {
    const expTimestamp = Math.floor(Date.now() / 1000) + 5 * 60;
    const expDate = new Date(expTimestamp * 1000);
    try {
        // Verifica se a chave secreta para o token está definida
        if (!process.env.SESSION_SECRET) throw new Error('SESSION_SECRET não está definido');

        const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

        // Criação do JWT (JSON Web Token) com os dados do usuário
        const sessionAuthToken = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(expTimestamp) // Token expira após 5m
            .sign(secret);

        // Configura o cookie para o token de sessão
        (await cookies()).set('sessionAuthToken', sessionAuthToken, {
            httpOnly: true, // O cookie de token de sessão deve ser HTTPOnly para segurança
            secure: true, // Em produção, o cookie será enviado apenas por HTTPS
            expires: expDate, // Definindo a data de expiração
            sameSite: 'lax', // Configurações de segurança do cookie
            path: '/', // O cookie estará disponível em toda a aplicação
        });
    } catch (error) {
        console.error('Erro ao criar o token de sessão:', error);

        throw new Error('Falha ao criar o token de sessão');
    };
};