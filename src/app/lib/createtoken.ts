import 'server-only';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/lib/opentoken';
import { SessionPayload } from '@/components/interfaces/interfaces';

export async function createSessionToken(payload: SessionPayload) {
    try {
        // Verifica se a chave secreta para o token está definida
        if (!process.env.SESSION_SECRET) throw new Error('SESSION_SECRET não está definido');

        const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

        // Criação do JWT (JSON Web Token) com os dados do usuário
        const sessionAuthToken = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d') // Token expira após 1 dia
            .sign(secret);

        // Resposta do token de sessão
        const tokenResponse = await openSessionToken(sessionAuthToken);

        const exp = tokenResponse?.exp;
        if (!exp) throw new Error('Tempo de expiração não encontrado na resposta do token');

        // Configura o cookie para armazenar o token de sessão
        const cookieStore = await cookies();

        // Configura o cookie para o token de sessão
        (await cookies()).set('sessionAuthToken', sessionAuthToken, {
            httpOnly: true, // O cookie de token de sessão deve ser HTTPOnly para segurança
            secure: true, // Em produção, o cookie será enviado apenas por HTTPS
            expires: new Date((exp as number) * 1000), // Definindo a data de expiração
            sameSite: 'lax', // Configurações de segurança do cookie
            path: '/', // O cookie estará disponível em toda a aplicação
        });

        // Adiciona o nome de usuário em um cookie separado
        if (payload.username) {
            cookieStore.set('username', payload.username, {
                httpOnly: false, // Permite que o cookie seja acessado pelo cliente
                secure: true,    // Em produção, o cookie será enviado apenas por HTTPS
                expires: new Date(exp * 1000), // Mesma expiração do token
                sameSite: 'lax',
                path: '/', // O cookie estará disponível em toda a aplicação
            });
        }
    } catch (error) {
        console.error('Erro ao criar o token de sessão:', error);

        throw new Error('Falha ao criar o token de sessão');
    };
};