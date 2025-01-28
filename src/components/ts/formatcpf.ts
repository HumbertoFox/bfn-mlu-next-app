// Função para formatar o CPF
export function formatCPF(cpf: string): string {
    return cpf
        .replace(/\D/g, '') // Remove tudo que não for número
        .replace(/(\d{3})(\d)/, '$1.$2') // Insere ponto após os 3 primeiros dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // Insere ponto após os 6 primeiros dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere o hífen antes dos 2 últimos dígitos
};