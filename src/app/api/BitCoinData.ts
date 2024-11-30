import { ApiResponse, BitcoinData } from "../components/Interfaces/Interfaces";


export const getBitcoinData = async (): Promise<BitcoinData[]> => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1');
        const data: ApiResponse = await response.json(); // Tipando a resposta da API

        // Verificar se 'data' contém a chave 'prices' e se ela é um array
        if (data && Array.isArray(data.prices)) {
            // Mapeia o array de preços (preço, timestamp) para o formato BitcoinData
            return data.prices.map(([timestamp, price]): BitcoinData => ({
                timestamp,
                price,
            }));
        } else {
            throw new Error('A resposta da API não contém dados de preços válidos');
        }
    } catch (error) {
        console.error('Erro ao buscar os dados do Bitcoin:', error);
        return []; // Retorna um array vazio em caso de erro
    };
};