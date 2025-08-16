import { getTranslations } from 'next-intl/server';

export interface CryptosPricesProps {
    bitcoin: { brl: number, usd: number };
    ethereum: { brl: number, usd: number };
    binancecoin: { brl: number, usd: number };
};

interface ApiResponseProps {
    prices: Array<[number, number]>;
};

interface BitcoinDataProps {
    timestamp: number;
    price: number;
};

export const getBitcoinData = async (): Promise<BitcoinDataProps[]> => {
    const t = await getTranslations('PriceData');
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=2');
        const data: ApiResponseProps = await response.json();

        if (data && Array.isArray(data.prices)) {
            return data.prices.map(([timestamp, price]): BitcoinDataProps => ({
                timestamp,
                price,
            }));
        } else {
            throw new Error(t('ErrorfetchingData'));
        }
    } catch (error) {
        console.error(t('ErrorTryCatch'), error);
        return [];
    };
};

export const getCryptosPrice = async (): Promise<CryptosPricesProps> => {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=brl,usd');
    const data: CryptosPricesProps = await response.json();

    return data;
};