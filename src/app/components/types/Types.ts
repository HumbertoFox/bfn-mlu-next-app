export type FormState =
    | {
        errors?: {
            name?: string[]; // Matriz de erros relacionados ao campo "nome"
            email?: string[]; // Matriz de erros relacionados ao campo "e-mail"
            password?: string[]; // Matriz de erros relacionados ao campo "senha"
        }
        message?: string; // Mensagem geral opcional (por exemplo, mensagem de sucesso ou erro)
    } | undefined;