'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type ChartBidsProps = {
    bitcoinCount: number;
    ethereumCount: number;
    binancecoinCount: number;
};

export function ChartBids({ bitcoinCount, ethereumCount, binancecoinCount }: ChartBidsProps) {
    const total = bitcoinCount + ethereumCount + binancecoinCount;

    const chartData = [
        { browser: 'bitcoin', visitors: bitcoinCount, fill: 'var(--color-bitcoin)' },
        { browser: 'ethereum', visitors: ethereumCount, fill: 'var(--color-ethereum)' },
        { browser: 'binancecoin', visitors: binancecoinCount, fill: 'var(--color-binancecoin)' },
    ];

    const chartConfig = {
        visitors: { label: 'Visitors', },
        bitcoin: { label: 'Bitcoin' },
        ethereum: { label: 'Ethereum' },
        binancecoin: { label: 'BinanceCoin' },
    } satisfies ChartConfig;

    return (
        <Card className='flex flex-col'>
            <CardHeader className='items-center pb-0'>
                <CardTitle>Pie Chart - Label List</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
                {total > 0 ? (
                    <ChartContainer
                        config={chartConfig}
                        className='[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]'
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent nameKey='visitors' hideLabel />}
                            />
                            <Pie data={chartData} dataKey='visitors'>
                                <LabelList
                                    dataKey='browser'
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
                        Nenhum lance registrado.
                    </div>
                )}
            </CardContent>
            <CardFooter className='flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2 leading-none font-medium'>
                    Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
                </div>
                <div className='text-muted-foreground leading-none'>
                    {total > 0
                        ? 'Showing total visitors for the last 6 months'
                        : 'Não há dados para exibir no momento'}
                </div>
            </CardFooter>
        </Card>
    );
}