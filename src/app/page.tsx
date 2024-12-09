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
import { getBitcoinData } from '@/app/api/bitCoindata';
import Head from 'next/head';
import { BitcoinData } from './components/interfaces/interfaces';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
        <title>Bitcoin Value in the Last 48 Hours - ${bitcoinData[bitcoinData.length - 1]?.price || 'Loading'}</title>
        <meta
          name='description'
          content={`Current Bitcoin price is ${bitcoinData[bitcoinData.length - 1]?.price || 'Loading'} USD`}
        />
      </Head>

      <div className='w-full min-h-svh flex flex-col items-center justify-between p-5'>
        <main className='w-full h-full max-w-2xl flex flex-col gap-8 items-center lg:max-w-7xl'>
          <header className='w-full flex gap-5 justify-between'>
            <div className='flex lg:justify-between lg:col-start-2'>
              <svg width='67px' height='67px' viewBox='0.004 0 64 64' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z'
                  fill='#F7931A' />
                <path
                  d='M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z'
                  fill='#FFFFFF' />
              </svg>
            </div>
            <div className='flex gap-5'>
              <Link
                className='text-sm hover:text-blue-700 duration-500'
                href={'/login'}
              >
                Iniciar Sessão
              </Link>

              <Link
                className='text-sm hover:text-blue-700 duration-500'
                href={'/signup'}
              >
                Cadastrar-se
              </Link>
            </div>
          </header>

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