export type FormStateUp =
    | {
        errors?: {
            cpf?: string[]; // Matriz de erros relacionados ao campo "cpf"
            name?: string[]; // Matriz de erros relacionados ao campo "nome"
            username?: string[]; // Matriz de erros relacionados ao campo "nome do usuário"
            email?: string[]; // Matriz de erros relacionados ao campo "e-mail"
            phone?: string[]; // Matriz de erros relacionados ao campo "telefone"
            password?: string[]; // Matriz de erros relacionados ao campo "senha"
        }
        message?: string; // Mensagem geral opcional (por exemplo, mensagem de sucesso ou erro)
    } | undefined;


export type FormStateIn =
    | {
        errors?: {
            username?: string[]; // Matriz de erros relacionados ao campo "nome do usuário"
            email?: string[]; // Matriz de erros relacionados ao campo "e-mail"
            password?: string[]; // Matriz de erros relacionados ao campo "senha"
        }
        message?: string; // Mensagem geral opcional (por exemplo, mensagem de sucesso ou erro)
    } | undefined;

// Definindo o tipo de erros
export type FormErrors = {
    [key: string]: string;  // Erros serão um objeto com chave string e valor string
};

export type FormStateCriptoUp =
    | {
        errors?: {
            amount?: string[]; // Matriz de erros relacionados ao campo "amount"
            paymentID?: string[]; // Matriz de erros relacionados ao campo "paymentID"
            cryptocurrency?: string[]; // Matriz de erros relacionados ao campo "cryptocurrency"
        }
        message?: string; // Mensagem geral opcional (por exemplo, mensagem de sucesso ou erro)
    } | undefined;