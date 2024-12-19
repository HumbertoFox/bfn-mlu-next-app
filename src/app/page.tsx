'use client'

import {
  useEffect,
  useState
} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getBitcoinData } from '@/app/api/bitCoinData';
import Head from 'next/head';
import { BitcoinData } from '@/components/interfaces/interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData[]>([]);
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [{
      label: 'Preço do Bitcoin (USD)',
      data: [] as number[],
      borderColor: '#F7931A',
      backgroundColor: 'rgba(247, 147, 26, 0.2)',
      borderWidth: 1,
    },],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Função para atualizar o estado do gráfico
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

  // Efeito para buscar os dados do Bitcoin
  useEffect(() => {
    const fetchBitcoinData = async () => {
      setIsLoading(true);
      const data = await getBitcoinData(); // Retorne uma matriz de BitcoinData
      setBitcoinData(data);
      setIsLoading(false);
    };

    fetchBitcoinData();
    const interval = setInterval(fetchBitcoinData, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
  }, []);

  // Efeito para atualizar o gráfico quando os dados do Bitcoin são recebidos
  useEffect(() => {
    if (bitcoinData.length > 0) {
      const labels = bitcoinData.map(data => new Date(data.timestamp).toLocaleTimeString());
      const data = bitcoinData.map(data => data.price);

      updateChartData(labels, data);
    }
  }, [bitcoinData]);
  return (
    <>
      <Head>
        <title>Bitcoin Value in the Last 48 Hours - ${bitcoinData[bitcoinData.length - 1]?.price || 'Loading...'}</title>
        <meta
          name='description'
          content={`Current Bitcoin price is ${bitcoinData[bitcoinData.length - 1]?.price || 'Loading...'} USD`}
        />
      </Head>

      <div className='w-full min-h-[90svh] flex flex-col items-center justify-between p-5'>
        <main className='w-full h-full max-w-2xl flex flex-col gap-8 items-center lg:max-w-7xl'>

          <div className='w-full h-[75vh] flex flex-col justify-center items-center p-2 gap-2'>

            <h1 className='text-2xl font-bold cursor-default'>Bitcoin Value in the Last 24 Hours</h1>
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
                        text: 'Preço (USD)',
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </main>

        <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center cursor-default'>
          <p>&copy; BetoFoxNet_Info 2015 - {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
};