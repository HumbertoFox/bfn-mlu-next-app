const isRepeatedCpf = (data: string): boolean | undefined => {
    const sanitizedData = data.replace(/\D/g, '');

    if (sanitizedData.length !== 11) return;

    const firstDigit = sanitizedData[0];
    return sanitizedData.split('').every(digit => digit === firstDigit);
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

export const getCheckedCpf = (data: string): boolean => {
    if (isRepeatedCpf(data)) return false;

    const primaryCheckDigit = calculateCheckDigit(data.substring(0, 9));
    const secondaryCheckDigit = calculateCheckDigit(data.substring(0, 9) + primaryCheckDigit);
    const correctCpf = data.substring(0, 9) + primaryCheckDigit + secondaryCheckDigit;

    return data === correctCpf;
};