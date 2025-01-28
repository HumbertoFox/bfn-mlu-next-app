import DangerButton from '@/components/buttons/dangerbutton'
import { TermComponentProps } from '@/components/interfaces/interfaces';

export default function TermComponent({ checked, handleTerm, handleChecked }: TermComponentProps) {
    return (
        <div className='absolute min-w-full min-h-screen flex flex-col items-center text-sm z-10'>
            <div className='w-2/4 min-h-screen bg-white flex flex-col gap-5 p-8'>
                <div className='flex flex-col'>
                    <h1>TERMO DE DOAÇÃO PARA FINS EDUCACIONAIS</h1>

                    <p>
                        Pelo presente instrumento particular de doação, de um lado, [Nome do(a) Dono(a)],
                        inscrito(a) no CPF/MF sob o nº [CPF do(a) Dono(a)], residente e domiciliado(a) à [Endereço Completo],
                        doravante denominado(a) "DONO(A)", e, de outro lado,
                        [Nome do(a) Donatário(a)], inscrito(a) no CPF/MF sob o nº [CPF do(a) Donatário(a)],
                        residente e domiciliado(a) à [Endereço Completo], doravante denominado(a) "DONATÁRIO(A)",
                        têm entre si justo e acordado o seguinte:
                    </p>

                    <h2>CLÁUSULA 1ª – OBJETO DA DOAÇÃO</h2>
                    <p>
                        O(a) DONO(A) faz a doação, neste ato, de [quantia, valor ou bem a ser doado],
                        que será destinada exclusivamente para fins educacionais,
                        com a finalidade de [descrever a utilização educacional da doação,
                        como bolsas de estudo, financiamento de materiais didáticos,
                        apoio a instituições de ensino, etc.].
                    </p>

                    <h3>CLÁUSULA 2ª – PROIBIÇÃO DE USO PARA CRIPTOMOEDAS E OUTROS FINS NÃO EDUCACIONAIS</h3>
                    <p>
                        Fica expressamente vedado o uso do valor doado, ou de qualquer parte dele,
                        para atividades relacionadas ao mercado de criptomoedas, como compra, venda, mineração,
                        investimento ou qualquer outra ação de natureza especulativa ou financeira envolvendo criptos,
                        ou para fins de promoção e exibição de lances ou transações envolvendo criptomoedas em aplicativos,
                        plataformas ou sites relacionados.
                        O uso da doação será limitado estritamente aos fins educacionais definidos na Cláusula 1ª.
                    </p>

                    <h4>CLÁUSULA 3ª – OBRIGAÇÃO DE TRANSPARÊNCIA</h4>
                    <p>
                        O(a) DONATÁRIO(A) compromete-se a fornecer, sempre que solicitado(a),
                        informações detalhadas sobre a utilização da doação,
                        a fim de garantir que a mesma esteja sendo utilizada de acordo com os
                        fins educacionais previstos neste termo.
                    </p>

                    <h5>CLÁUSULA 4ª – NÃO HAVERÁ RETORNO FINANCEIRO</h5>
                    <p>
                        A doação realizada é de caráter gratuito, sem a obrigação de qualquer tipo de retribuição
                        financeira ou qualquer outro benefício ao DONO(A) em favor do DONATÁRIO(A).
                    </p>

                    <h6>CLÁUSULA 5ª – DISPOSIÇÕES FINAIS</h6>
                    <p>
                        Este Termo de Doação é firmado em duas vias de igual teor,
                        ficando uma delas com o(a) DONO(A) e a outra com o(a) DONATÁRIO(A).
                        Ambas as partes declaram ter lido, entendido e aceitado todos os termos e condições aqui descritos.
                    </p>

                    <p>Paulista-PE, {new Date().getDay()} / {new Date().getMonth()} / {new Date().getFullYear()}</p>

                    <p>{'user'}</p>
                    <p>Nome do Usuário</p>
                    <p>Doador</p>

                    <p>22.862.875 HUMBERTO RIBEIRO DE SALES</p>
                    <p>BetoFoxNet_Info (CNPJ: 22.862.875/0001-35)</p>
                    <p>DONATÁRIO(A)</p>
                </div>

                <div className='min-w-full flex items-center justify-end gap-7'>
                    <label
                        className='font-bold text-sm text-nowrap'
                        htmlFor='donation'
                    >
                        Li o Termo de Doação
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