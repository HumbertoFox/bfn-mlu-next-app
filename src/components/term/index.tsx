'use client';

import DangerButton from '@/components/buttons/dangerbutton'
import { TermComponentProps } from '@/components/interfaces/interfaces';
import gsap from 'gsap';
import {
    useEffect,
    useRef
} from 'react';

const date = new Date();
const day = date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });

export default function TermComponent({ checked, handleTerm, handleChecked }: TermComponentProps) {
    const termRef = useRef(null);

    useEffect(() => {
        const term = termRef.current;

        gsap.fromTo(term, {
            opacity: 0,
            y: -500
        }, {
            opacity: 1,
            y: 0,
            duration: 1
        });
    }, []);
    return (
        <div
            className='absolute top-0 min-w-full min-h-screen flex flex-col items-center text-xs opacity-0 z-50'
            ref={termRef}
        >
            <div className='w-2/4 min-h-screen bg-white flex flex-col gap-5 p-8'>
                <div className='flex flex-col'>
                    <h1 className='text-center font-bold uppercase py-5'>
                        Termo de Doação para Lance em Criptomoeda
                    </h1>
                    <p className='font-bold py-2'>1. Objeto da Doação:</p>
                    <p className='pl-5'>
                        Este Termo de Doação tem como objetivo regulamentar a realização de doações no
                        valor de R$ 10,00 &#40;dez reais&#41; por meio de lances na criptomoeda específica indicada
                        pela organização, conforme as condições aqui descritas.
                    </p>

                    <p className='font-bold py-2'>2. Valor da Doação e Forma de Pagamento:</p>
                    <p className='pl-5'>
                        O participante compromete-se a realizar uma doação no valor de R$ 10,00 &#40;dez reais&#41;,
                        através de um lance utilizando a criptomoeda especificada.
                        O valor será convertido para a moeda digital no momento da transação,
                        respeitando o câmbio vigente no instante da doação.
                    </p>

                    <p className='font-bold py-2'>3. Destinação dos Recursos Arrecadados:</p>
                    <p className='pl-5'>
                        Os recursos obtidos com os lances realizados serão distribuídos da seguinte forma:
                    </p>

                    <p className='pl-5'>
                        70% &#40;setenta por cento&#41; do total arrecadado será destinado ao objetivo principal da campanha,
                        conforme estabelecido pela organização.
                    </p>
                    <p className='pl-5'>
                        30% &#40;trinta por cento&#41; do total arrecadado será destinado aos encargos administrativos
                        e educacionais relacionados à campanha, incluindo custos operacionais,
                        desenvolvimento de projetos sociais e ações educacionais.
                    </p>
                    <p className='font-bold py-2'>4. Transações em Criptomoedas:</p>
                    <p className='pl-5'>
                        O participante autoriza a organização a receber as doações em criptomoedas,
                        que serão convertidas para a moeda fiduciária no momento da arrecadação.
                        Todas as transações serão registradas de acordo com as normas da plataforma
                        utilizada para realização dos lances.
                    </p>

                    <p className='font-bold py-2'>5. Garantias de Transparência e Prestação de Contas:</p>
                    <p className='pl-5'>
                        Em conformidade com o Código Civil Brasileiro &#40;Lei nº 10.406/2002&#41; e a Lei de Diretrizes
                        e Bases da Educação Nacional &#40;Lei nº 9.394/1996&#41;, a organização compromete-se a prestar contas
                        de forma transparente e periódica sobre a aplicação dos recursos arrecadados. Todos os gastos
                        serão descritos detalhadamente, garantindo que a destinação dos recursos obedeça às condições estabelecidas.
                    </p>

                    <p className='font-bold py-2'>6. Obrigações Fiscais e Legais:</p>
                    <p className='pl-5'>
                        A organização compromete-se a cumprir todas as obrigações fiscais, tributárias e legais,
                        de acordo com a legislação brasileira, especialmente a Lei nº 12.865/2013,
                        que regula as operações com moedas eletrônicas e a Lei nº 13.709/2018 &#40;Lei Geral de Proteção de Dados - LGPD&#41;,
                        no que se refere à coleta e tratamento de dados pessoais dos participantes.
                    </p>

                    <p className='font-bold py-2'>7. Cancelamento ou Alterações no Termo:</p>
                    <p className='pl-5'>
                        A organização reserva-se o direito de modificar os termos deste documento ou cancelar qualquer lance que não esteja
                        em conformidade com as condições estabelecidas, mediante aviso prévio. Caso haja qualquer alteração relevante,
                        a organização informará aos participantes, garantindo a transparência e o direito à revogação da doação, caso necessário.
                    </p>

                    <p className='font-bold py-2'>8. Doação Voluntária:</p>
                    <p className='pl-5'>
                        Fica claro que a doação é de caráter voluntário, e o participante não tem qualquer obrigação de realizar o lance.
                        A doação não constitui vínculo jurídico de natureza empregatícia, societária ou qualquer outra que implique em
                        remuneração ou benefício direto ao doador.
                    </p>

                    <p className='font-bold py-2'>9. Cláusula de Responsabilidade:</p>
                    <p className='pl-5'>
                        O participante declara, para todos os efeitos legais, que está ciente da natureza voluntária de sua doação e da destinação
                        dos recursos conforme descrito neste termo. A organização não será responsável por danos diretos ou indiretos decorrentes
                        do uso de criptomoedas ou de quaisquer falhas em transações de pagamento realizadas pelo participante.
                    </p>

                    <p className='font-bold py-2'>10. Disposições Finais:</p>
                    <p className='pl-5'>
                        Este termo entra em vigor na data de sua assinatura, sendo válido para todas as doações realizadas dentro da campanha.
                        Fica eleito o foro da comarca Paulista-PE, para a solução de eventuais litígios, com renúncia expressa de qualquer outro,
                        por mais privilegiado que seja.
                    </p>

                    <p className='text-center py-3'>
                        Assinam este Termo as partes, cientes e de acordo com todas as condições aqui estabelecidas.
                    </p>
                    <div className='flex items-center justify-evenly text-center'>
                        <div>
                            <p className='font-bold text-left py-2'>Organização:</p>
                            <p>22.862.875 HUMBERTO RIBEIRO DE SALES</p>
                            <p>AV Antonio Cabral de Souza</p>
                            <p>344, Box B, Maranguape II, Paulista-PE</p>
                            <p>22.862.875/0001-35</p>
                        </div>

                        <div>
                            <p className='font-bold text-left py-2'>Participante:</p>
                            <p>[Nome do Participante]</p>
                            <p>[Endereço]</p>
                            <p>[CPF]</p>
                        </div>
                    </div>

                    <p className='text-right py-4'>Paulista-PE, {day}.</p>
                </div>

                <div className='min-w-full flex items-center justify-end gap-7'>
                    <label
                        className='font-bold text-sm text-nowrap'
                        htmlFor='donation'
                    >
                        Li e concordo com o Termo de Doação!
                    </label>
                    <input
                        className=''
                        id='donation'
                        name='donation'
                        type='checkbox'
                        checked={checked}
                        onChange={handleChecked}
                        required
                    />
                </div>

                <div className='w-full flex'>
                    <DangerButton
                        type='button'
                        onClick={handleTerm}
                    >
                        Fechar
                    </DangerButton>
                </div>
            </div>
        </div>
    );
}