'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useTranslations } from 'next-intl';

type ChartBidsProps = {
    bitcoinCount: number;
    ethereumCount: number;
    binancecoinCount: number;
};

export function ChartBids({ bitcoinCount, ethereumCount, binancecoinCount }: ChartBidsProps) {
    const t = useTranslations('ChartBids');
    const total = bitcoinCount + ethereumCount + binancecoinCount;

    const chartData = [
        { crypto: 'bitcoin', cryptos: bitcoinCount, fill: 'var(--color-bitcoin)' },
        { crypto: 'ethereum', cryptos: ethereumCount, fill: 'var(--color-ethereum)' },
        { crypto: 'binancecoin', cryptos: binancecoinCount, fill: 'var(--color-binancecoin)' },
    ];

    const chartConfig = {
        cryptos: { label: 'Cryptos', },
        bitcoin: { label: 'Bitcoin' },
        ethereum: { label: 'Ethereum' },
        binancecoin: { label: 'BinanceCoin' },
    } satisfies ChartConfig;

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const now = new Date();
    const nameMonth = months[now.getMonth()];
    const yearCurrent = now.getFullYear();
    return (
        <Card className='flex flex-col'>
            <CardHeader className='items-center pb-0'>
                <CardTitle>{t('CardTitle')}</CardTitle>
                <CardDescription>{nameMonth} {t('CardDescription')} {yearCurrent}</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
                {total > 0 ? (
                    <ChartContainer
                        config={chartConfig}
                        className='[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]'
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent nameKey='cryptos' hideLabel />}
                            />
                            <Pie data={chartData} dataKey='cryptos'>
                                <LabelList
                                    dataKey='crypto'
                                    className='fill-background'
                                    stroke='none'
                                    fontSize={12}
                                    formatter={(value: keyof typeof chartConfig) =>
                                        chartConfig[value]?.label
                                    }
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                ) : (
                    <div className='text-center text-muted-foreground py-10'>
                        {t('MessageNoBids')}
                    </div>
                )}
            </CardContent>
            <CardFooter className='flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2 leading-none font-medium'>
                    {t('CardFooterTitle')} <TrendingUp className='h-4 w-4' />
                </div>
                <div className='text-muted-foreground leading-none'>
                    {total > 0
                        ? t('CardFooterTextYes')
                        : t('CardFooterTextNo')
                    }
                </div>
            </CardFooter>
        </Card>
    );
}