'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getCryptosPrice } from '@/app/api/bitcoindatas';
import { CryptosData } from '@/app/api/actions/cryptosdata';
import { useBreadcrumbs } from '@/context/breadcrumb-context';
import { useTranslations } from 'next-intl';
import CriptoUpForm from '@/components/criptoupform';
import gsap from 'gsap';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface CryptoData {
    valueBRL: number;
    valueUSD: number;
    bids: number;
    date: string;
};

export default function DashboardPageClient() {
    const { setBreadcrumbs } = useBreadcrumbs();
    const tb = useTranslations('Breadcrumb');
    const t = useTranslations('Dashboard');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedCryptocurrency, setSelectedCryptocurrency] = useState<string | null>(null);
    const [bitcoin, setBitcoin] = useState<CryptoData | null>(null);
    const [ethereum, setEthereum] = useState<CryptoData | null>(null);
    const [bnb, setBnb] = useState<CryptoData | null>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    const handleParticiparClick = (cryptocurrency: string) => {
        setSelectedCryptocurrency(cryptocurrency);
        setIsFormVisible(true);
    };

    const handleCloseCrypto = () => {
        setIsFormVisible(false);
        fetchCryptoData();
    };

    const formatCurrency = (value: number, locale: string, currency: string) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        })
            .format(value);
    };

    const fetchCryptoData = async () => {
        try {
            const data = await getCryptosPrice();

            const {
                bitcoinBidCountData,
                ethereumBidCountData,
                bnbBidCountData,
                bitcoinLastBidDate,
                ethereumLastBidDate,
                bnbLastBidDate
            } = await CryptosData();

            setBitcoin({
                valueBRL: data?.bitcoin?.brl,
                valueUSD: data?.bitcoin?.usd,
                bids: bitcoinBidCountData ? bitcoinBidCountData : 0,
                date: bitcoinLastBidDate ? new Date(bitcoinLastBidDate).toLocaleDateString() : t('NoBid'),
            });

            setEthereum({
                valueBRL: data?.ethereum?.brl,
                valueUSD: data?.ethereum?.usd,
                bids: ethereumBidCountData ? ethereumBidCountData : 0,
                date: ethereumLastBidDate ? new Date(ethereumLastBidDate).toLocaleDateString() : t('NoBid'),
            });

            setBnb({
                valueBRL: data?.binancecoin?.brl,
                valueUSD: data?.binancecoin?.usd,
                bids: bnbBidCountData ? bnbBidCountData : 0,
                date: bnbLastBidDate ? new Date(bnbLastBidDate).toLocaleDateString() : t('NoBid'),
            });
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        };
    };

    useEffect(() => {
        fetchCryptoData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    useEffect(() => setBreadcrumbs([{ title: tb('Dashboard'), href: '/dashboard' }]), [setBreadcrumbs, tb]);
    return (
        <main className='w-full h-full flex flex-wrap gap-20 justify-evenly p-5'>
            <div
                className='w-72 h-96 flex flex-col items-center justify-between border border-orange-500 rounded-lg p-1 pb-5 shadow-orange-500 shadow-md opacity-0'
                ref={leftRef}
            >
                <Image
                    className='w-36 h-36 rounded-md'
                    src={'/images/bitcoin.png'}
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
                                <div className='w-full p-1 border-r'>
                                    <h1>{t('TextPriceCurrent')}</h1>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <p>{formatCurrency(bitcoin?.valueBRL, 'pt-BR', 'BRL')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-sm text-red-400 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <h2>{t('TextPriceCurrent')}</h2>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <p>{formatCurrency(bitcoin?.valueUSD, 'en-US', 'USD')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-xs text-green-600 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <span>{bitcoin?.date}</span>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <span>{bitcoin?.bids} {bitcoin?.bids > 1 ? t('TextBids') : t('TextBid')}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='w-full flex font-semibold text-base text-blue-400 py-2'>
                                <div className='w-full p-1 border-r'>
                                    <h1 className=''>{t('TextPriceCurrent')}</h1>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <Skeleton className="size-full" />
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-sm text-red-400 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <h2>{t('TextPriceCurrent')}</h2>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <Skeleton className="size-full" />
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-xs text-green-600 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <Skeleton className="size-full" />
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <Skeleton className="size-full" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <Button
                    type='button'
                    onClick={() => handleParticiparClick('bitcoin')}
                    className='bg-orange-500 hover:bg-orange-400'
                >
                    {t('ButtonText')}
                </Button>
            </div>

            <div
                className='w-72 h-96 flex flex-col items-center justify-between border border-orange-500 rounded-lg p-1 pb-5 shadow-orange-500 shadow-md opacity-0'
                ref={centerRef}
            >
                <Image
                    className='w-36 h-36 rounded-md'
                    src={'/images/ethereum.png'}
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
                                <div className='w-full p-1 border-r'>
                                    <h1>{t('TextPriceCurrent')}</h1>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <p>{formatCurrency(ethereum?.valueBRL, 'pt-BR', 'BRL')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-sm text-red-400 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <h2>{t('TextPriceCurrent')}</h2>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <p>{formatCurrency(ethereum?.valueUSD, 'en-US', 'USD')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-xs text-green-600 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <span>{ethereum?.date}</span>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <span>{ethereum?.bids} {ethereum?.bids > 1 ? t('TextBids') : t('TextBid')}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='w-full flex font-semibold text-base text-blue-400 py-2'>
                                <div className='w-full p-1 border-r'>
                                    <h1>{t('TextPriceCurrent')}</h1>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <Skeleton className="size-full" />
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-sm text-red-400 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <h2>{t('TextPriceCurrent')}</h2>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <Skeleton className="size-full" />
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-xs text-green-600 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <Skeleton className="size-full" />
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <Skeleton className="size-full" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <Button
                    type='button'
                    onClick={() => handleParticiparClick('ethereum')}
                    className='bg-blue-500 hover:bg-blue-400'
                >
                    {t('ButtonText')}
                </Button>
            </div>

            <div
                className='w-72 h-96 flex flex-col items-center justify-between border border-orange-500 rounded-lg p-1 pb-5 shadow-orange-500 shadow-md opacity-0'
                ref={rightRef}
            >
                <Image
                    className='w-36 h-36 rounded-md'
                    src={'/images/binancecoin.png'}
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
                                <div className='w-full p-1 border-r'>
                                    <h1>{t('TextPriceCurrent')}</h1>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <p>{formatCurrency(bnb?.valueBRL, 'pt-BR', 'BRL')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-sm text-red-400 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <h2>{t('TextPriceCurrent')}</h2>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <p>{formatCurrency(bnb?.valueUSD, 'en-US', 'USD')}</p>
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-xs text-green-600 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <span>{bnb?.date}</span>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <span>{bnb?.bids} {bnb?.bids > 1 ? t('TextBids') : t('TextBid')}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='w-full flex font-semibold text-base text-blue-400 py-2'>
                                <div className='w-full p-1 border-r'>
                                    <h1 className=''>{t('TextPriceCurrent')}</h1>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <Skeleton className="size-full" />
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-sm text-red-400 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <h2>{t('TextPriceCurrent')}</h2>
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <Skeleton className="size-full" />
                                </div>
                            </div>

                            <div className='w-full flex font-semibold text-xs text-green-600 py-2 border-t'>
                                <div className='w-full p-1 border-r'>
                                    <Skeleton className="size-full" />
                                </div>
                                <div className='w-full p-1 border-l'>
                                    <Skeleton className="size-full" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <Button
                    type="button"
                    onClick={() => handleParticiparClick('binancecoin')}
                    className="bg-yellow-500 hover:bg-yellow-400"
                >
                    {t('ButtonText')}
                </Button>
            </div>

            <AlertDialog open={isFormVisible}>
                <AlertDialogContent className='w-fit max-h-[770px] p-0 border-0 overflow-y-auto'>
                    <AlertDialogTitle className="hidden" />
                    {selectedCryptocurrency && (
                        <CriptoUpForm
                            cryptocurrency={selectedCryptocurrency}
                            onClose={handleCloseCrypto}
                        />
                    )}
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}