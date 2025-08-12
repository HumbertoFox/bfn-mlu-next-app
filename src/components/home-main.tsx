'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getBitcoinData } from '@/app/api/bitcoindatas';
import { BitcoinDataProps } from '@/types';
import { useTranslations } from 'next-intl';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function HomeMainComponent() {
    const t = useTranslations('Welcome');
    const [bitcoinData, setBitcoinData] = useState<BitcoinDataProps[]>([]);
    const [chartData, setChartData] = useState({
        labels: [] as string[],
        datasets: [{
            label: `${t('TextPriceBitcoin')} (USD)`,
            data: [] as number[],
            borderColor: '#F7931A',
            backgroundColor: 'rgba(247, 147, 26, 0.2)',
            borderWidth: 1
        }]
    });
    const [isLoading, setIsLoading] = useState(true);

    const updateChartData = (labels: string[], data: number[]) => {
        setChartData((prevChartData) => ({
            ...prevChartData,
            labels,
            datasets: [
                {
                    ...prevChartData.datasets[0],
                    data,
                },
            ],
        }));
    };

    useEffect(() => {
        const fetchBitcoinData = async () => {
            setIsLoading(true);
            const data = await getBitcoinData();
            setBitcoinData(data);
            setIsLoading(false);
        };

        fetchBitcoinData();
        const interval = setInterval(fetchBitcoinData, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (bitcoinData.length > 0) {
            const labels = bitcoinData.map(data => new Date(data.timestamp).toLocaleTimeString());
            const data = bitcoinData.map(data => data.price);

            updateChartData(labels, data);
        }
    }, [bitcoinData]);
    return (
        <main className='w-full h-full max-w-2xl flex flex-col gap-8 items-center lg:max-w-7xl'>

            <div className='w-full h-[75vh] flex flex-col justify-center items-center p-2 gap-2'>

                <h1 className='text-2xl font-bold cursor-default'>{t('TextH1')}</h1>
                {isLoading ? (
                    <p>Loading data...</p>
                ) : (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    type: 'category',
                                    title: {
                                        display: true,
                                        text: 'Hora',
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: `${t('TextPrice')} (USD)`,
                                    },
                                },
                            },
                        }}
                    />
                )}
            </div>
        </main>
    );
}