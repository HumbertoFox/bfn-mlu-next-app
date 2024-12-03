'use client'

import { useEffect, useState } from 'react';
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
import { getBitcoinData } from '@/app/api/BitCoinData';
import Head from 'next/head';
import { BitcoinData } from './components/Interfaces/Interfaces';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Home() {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData[]>([]);
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Bitcoin (USD)',
        data: [] as number[],
        borderColor: '#F7931A',
        backgroundColor: 'rgba(247, 147, 26, 0.2)',
        borderWidth: 1,
      },
    ],
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
      const data = await getBitcoinData(); // Suponha que esta função retorne uma matriz de BitcoinData
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
      const labels = bitcoinData.map((data) => new Date(data.timestamp).toLocaleTimeString());
      const data = bitcoinData.map((data) => data.price);

      updateChartData(labels, data);
    }
  }, [bitcoinData]);

  return (
    <>
      <Head>
        <title>Bitcoin Value in the Last 24 Hours - ${bitcoinData[bitcoinData.length - 1]?.price || 'Loading'}</title>
        <meta
          name='description'
          content={`Current Bitcoin price is ${bitcoinData[bitcoinData.length - 1]?.price || 'loading'} USD`}
        />
      </Head>

      <div className='w-full min-h-screen flex flex-col justify-between p-5'>
        <main className='flex flex-col gap-8 row-start-2 items-center'>
          <header className='w-full max-w-7xl flex gap-5 justify-end'>
            <Link
              className='text-sm hover:text-blue-700 duration-500'
              href={'/Login'}
            >
              Iniciar Sessão
            </Link>

            <Link
              className='text-sm hover:text-blue-700 duration-500'
              href={'/Signup'}
            >
              Cadastrar-se
            </Link>
          </header>

          <div className='w-full h-[50vh] flex flex-col justify-center items-center p-2 gap-2'>

            <h1 className='text-2xl font-bold cursor-default'>Bitcoin Value in the Last 24 Hours</h1>
            {isLoading ? (
              <p>Loading data...</p>
            ) : (
              <Line
                data={chartData}
                options={{ responsive: true }}
              />
            )}
          </div>
        </main>

        <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center cursor-default'>
          <p>&copy; {new Date().getFullYear()} Bitcoin Data</p>
        </footer>
      </div>
    </>
  );
};