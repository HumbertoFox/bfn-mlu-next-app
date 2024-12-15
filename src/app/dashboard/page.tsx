'use client';

import Image from 'next/image';
import TypetButton from '../components/buttons/typebutton';
import {
    useEffect,
    useRef,
    useState
} from 'react';
import { CryptoData } from '../components/interfaces/interfaces';
import { getCriptosPrice } from '../api/bitCoindata';
import { CriptosData } from '../actions/criptosdata';
import CriptoUpForm from '../components/ui/criptoup-form';
import gsap from 'gsap';

export default function Dashboard() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedCryptocurrency, setSelectedCryptocurrency] = useState<string | null>(null);
    const [bitcoin, setBitcoin] = useState<CryptoData | null>(null);
    const [ethereum, setEthereum] = useState<CryptoData | null>(null);
    const [bnb, setBnb] = useState<CryptoData | null>(null);
    const leftRef = useRef(null);
    const centerRef = useRef(null);
    const rightRef = useRef(null);

    const handleParticiparClick = (cryptocurrency: string) => {
        setSelectedCryptocurrency(cryptocurrency);
        setIsFormVisible(true);  // Torna o formulário visível
    };

    const handleCloseCrypto = () => {
        setIsFormVisible(false); // Enviar fechar form
        fetchCryptoData(); // Atualiza os lances criptos
    };

    // Função para formatar valores de moeda
    const formatCurrency = (
        value: number,
        locale: string,
        currency: string
    ) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        })
            .format(value);
    };

    // Função para buscar os valores
    const fetchCryptoData = async () => {
        try {
            const data = await getCriptosPrice(); // Usando a função importada

            const {
                bitcoinBidCountData,
                ethereumBidCountData,
                bnbBidCountData,
                bitcoinLastBidDate,
                ethereumLastBidDate,
                bnbLastBidDate
            } = await CriptosData(); // Obtendo dados de lances

            // Definindo os dados para cada criptomoeda
            setBitcoin({
                valueBRL: data?.bitcoin?.brl,
                valueUSD: data?.bitcoin?.usd,
                bids: bitcoinBidCountData ? bitcoinBidCountData : 0,  // Usando dados de lances
                date: bitcoinLastBidDate ? new Date(bitcoinLastBidDate).toLocaleDateString() : 'Sem Lance',
            });

            setEthereum({
                valueBRL: data?.ethereum?.brl,
                valueUSD: data?.ethereum?.usd,
                bids: ethereumBidCountData ? ethereumBidCountData : 0,  // Usando dados de lances
                date: ethereumLastBidDate ? new Date(ethereumLastBidDate).toLocaleDateString() : 'Sem Lance',
            });

            setBnb({
                valueBRL: data?.binancecoin?.brl,
                valueUSD: data?.binancecoin?.usd,
                bids: bnbBidCountData ? bnbBidCountData : 0,  // Usando dados de lances
                date: bnbLastBidDate ? new Date(bnbLastBidDate).toLocaleDateString() : 'Sem Lance',
            });
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        };
    };

    // Buscar dados ao montar o componente
    useEffect(() => {
        fetchCryptoData();
    }, []);

    // Efeitos do gsap
    useEffect(() => {
        const divLeft = leftRef.current;
        const divCenter = centerRef.current;
        const divRight = rightRef.current;

        gsap.fromTo(
            divLeft,
            {
                opacity: 0,
                x: -500,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
            },
        );

        gsap.fromTo(
            divCenter,
            {
                opacity: 0,
                y: 500,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
            },
        );

        gsap.fromTo(
            divRight,
            {
                opacity: 0,
                y: -500,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 1,
            },
        );
    }, []);
    return (
        <main
            className='w-full min-h-full flex flex-wrap gap-20 items-center justify-evenly max-w-2xl lg:max-w-7xl'
        >
            <div
                className='w-72 h-96 flex flex-col items-center justify-between border border-orange-500 rounded-lg p-1 pb-5 shadow-orange-500 shadow-md opacity-0'
                ref={leftRef}
            >
                <Image
                    className='w-36 h-36 rounded-md'
                    src={'/images/bitcoin.webp'}
                    alt='Imagem cripto'
                    width={512}
                    height={512}
                    priority
                />
                <div className='font-semibold text-2xl text-orange-400'>
                    Bitcoin
                </div>
                <div className='w-full flex flex-col items-center text-center'>
                    {bitcoin ? (
                        <>
                            <div className='w-full flex font-semibold text-base text-blue-400 py-2'>
                                <div className='w-full p-1 border-r-[1px]'>
                                    <h1 className=''>Valor Atual</h1>
                                </div>
                                <div className='w-full p-1 border-l-[1px]'>
                                    <p>{formatCurrency(bitcoin?.valueBRL, 'pt-BR', 'BRL')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-sm text-red-400 py-2 border-t-[1px]'>
                                <div className='w-full p-1 border-r-[1px]'>
                                    <h2>Valor Atual</h2>
                                </div>
                                <div className='w-full p-1 border-l-[1px]'>
                                    <p>{formatCurrency(bitcoin?.valueUSD, 'en-US', 'USD')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-xs text-green-600 py-2 border-t-[1px]'>
                                <div className='w-full p-1 border-r-[1px]'>
                                    <span>{bitcoin?.date}</span>
                                </div>
                                <div className='w-full p-1 border-l-[1px]'>
                                    <span>{bitcoin?.bids} {bitcoin?.bids > 1 ? 'Lances' : 'Lance'}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Carregando dados...</p>
                    )}
                </div>

                <TypetButton onClick={() => handleParticiparClick('bitcoin')}>
                    Participar
                </TypetButton>
            </div>

            <div
                className='w-72 h-96 flex flex-col items-center justify-between border border-orange-500 rounded-lg p-1 pb-5 shadow-orange-500 shadow-md opacity-0'
                ref={centerRef}
            >
                <Image
                    className='w-36 h-36 rounded-md'
                    src={'/images/ethereum.webp'}
                    alt='Imagem cripto'
                    width={512}
                    height={512}
                    priority
                />
                <div className='font-semibold text-2xl text-orange-400'>
                    Ethereum
                </div>
                <div className='w-full flex flex-col items-center text-center'>
                    {ethereum ? (
                        <>
                            <div className='w-full flex font-semibold text-base text-blue-400 py-2'>
                                <div className='w-full p-1 border-r-[1px]'>
                                    <h1 className=''>Valor Atual</h1>
                                </div>
                                <div className='w-full p-1 border-l-[1px]'>
                                    <p>{formatCurrency(ethereum?.valueBRL, 'pt-BR', 'BRL')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-sm text-red-400 py-2 border-t-[1px]'>
                                <div className='w-full p-1 border-r-[1px]'>
                                    <h2>Valor Atual</h2>
                                </div>
                                <div className='w-full p-1 border-l-[1px]'>
                                    <p>{formatCurrency(ethereum?.valueUSD, 'en-US', 'USD')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-xs text-green-600 py-2 border-t-[1px]'>
                                <div className='w-full p-1 border-r-[1px]'>
                                    <span>{ethereum?.date}</span>
                                </div>
                                <div className='w-full p-1 border-l-[1px]'>
                                    <span>{ethereum?.bids} {ethereum?.bids > 1 ? 'Lances' : 'Lance'}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Carregando dados...</p>
                    )}
                </div>

                <TypetButton onClick={() => handleParticiparClick('ethereum')}>
                    Participar
                </TypetButton>
            </div>

            <div
                className='w-72 h-96 flex flex-col items-center justify-between border border-orange-500 rounded-lg p-1 pb-5 shadow-orange-500 shadow-md opacity-0'
                ref={rightRef}
            >
                <Image
                    className='w-36 h-36 rounded-md'
                    src={'/images/binancecoin.webp'}
                    alt='Imagem cripto'
                    width={512}
                    height={512}
                    priority
                />
                <div className='font-semibold text-2xl text-orange-400'>
                    Bnb
                </div>
                <div className='w-full flex flex-col items-center text-center'>
                    {bnb ? (
                        <>
                            <div className='w-full flex font-semibold text-base text-blue-400 py-2'>
                                <div className='w-full p-1 border-r-[1px]'>
                                    <h1 className=''>Valor Atual</h1>
                                </div>
                                <div className='w-full p-1 border-l-[1px]'>
                                    <p>{formatCurrency(bnb?.valueBRL, 'pt-BR', 'BRL')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-sm text-red-400 py-2 border-t-[1px]'>
                                <div className='w-full p-1 border-r-[1px]'>
                                    <h2>Valor Atual</h2>
                                </div>
                                <div className='w-full p-1 border-l-[1px]'>
                                    <p>{formatCurrency(bnb?.valueUSD, 'en-US', 'USD')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-xs text-green-600 py-2 border-t-[1px]'>
                                <div className='w-full p-1 border-r-[1px]'>
                                    <span>{bnb?.date}</span>
                                </div>
                                <div className='w-full p-1 border-l-[1px]'>
                                    <span>{bnb?.bids} {bnb?.bids > 1 ? 'Lances' : 'Lance'}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Carregando dados...</p>
                    )}
                </div>

                <TypetButton onClick={() => handleParticiparClick('binancecoin')}>
                    Participar
                </TypetButton>
            </div>

            {isFormVisible && selectedCryptocurrency && (
                <CriptoUpForm
                    cryptocurrency={selectedCryptocurrency}
                    onClose={() => handleCloseCrypto()}
                />
            )}
        </main>
    );
};