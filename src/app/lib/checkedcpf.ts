export const getCheckedCpf = (data: string): boolean | undefined => {

    const sanitizedData = data.replace(/\D/g, '');

    if (sanitizedData.length !== 11) {
        return;
    };

    const isRepeatedCPF = (cpf: string): boolean => {
        const firstDigit = cpf[0];

        return cpf.split('').every(digit => digit === firstDigit);
    };

    if (isRepeatedCPF(sanitizedData)) {
        return false;
    };

    const calculateCheckDigit = (input: string): string => {
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
            const digit = Number(input.charAt(i));
            const weight = input.length + 1 - i;
            sum += digit * weight;
        };

        const remainder = sum % 11;
        return remainder < 2 ? '0' : (11 - remainder).toString();
    };

    const primaryCheckDigit = calculateCheckDigit(data.substring(0, 9));
    const secondaryCheckDigit = calculateCheckDigit(data.substring(0, 9) + primaryCheckDigit);
    const correctCpf = data.substring(0, 9) + primaryCheckDigit + secondaryCheckDigit;

    return data === correctCpf;
};