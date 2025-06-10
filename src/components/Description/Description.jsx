import './Description.css';
import React, { useState } from 'react';
import Star from '../Classifcation/Stars';
import { FaStar } from 'react-icons/fa';
import ColorButtons from '../Buttons/ColorButtons/ColorButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SizeButtonShoes from '../Buttons/SizeButton/SizeButton';
import { supabase } from '../../services/supabaseClient';
import Tenis1 from '../../../public/detalhes.png';

const coresFundo = [
    { cor: '#E2E3FF' },
    { cor: '#FFE8BC' },
    { cor: '#FFC0BC' },
    { cor: '#DEC699' },
    { cor: '#E8DFCF' }
];

export function Description() {
    const [indiceCor, setIndiceCor] = useState(0);

    const proximaCor = () => {
        setIndiceCor((indiceCor + 1) % coresFundo.length);
    };

    const anteriorCor = () => {
        setIndiceCor((indiceCor - 1 + coresFundo.length) % coresFundo.length);
    };

    async function adicionarAoCarrinho() {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData?.session?.user;
        if (!user) {
            alert('Você precisa estar logado para adicionar ao carrinho.');
            return;
        }

        const { data: produto, error } = await supabase
            .from('produtos')
            .select('*')
            .ilike('nome', '%Tênis Nike Air Force 1%')
            .limit(1)
            .single();

        if (error || !produto) {
            alert('Produto não encontrado no banco de dados.');
            return;
        }

        if (!produto) {
            alert('Produto ainda não carregado.');
            return;
        }

        const { error: insertError } = await supabase.from('carrinho').insert([
            {
                usuario_id: user.id,
                produto_id: produto.id,
                quantidade: 1,
            }
        ]);

        if (insertError) {
            console.error(insertError);
            alert('Erro ao adicionar produto ao carrinho.');
        } else {
            alert('Produto adicionado ao carrinho com sucesso!');
        }
    }

    return (
        <div className='color-background'>
            <div className='containerDP'>
                <div className='caminhoTenis'>
                    <h5>Home / Produtos / Tênis / Nike / Tênis Nike Revolution</h5>
                </div>
                <div className='descricaoProduto'>
                    <div className='imgDescProd'>
                        <div className='imagemGrande' style={{ backgroundColor: coresFundo[indiceCor].cor }}>
                            <img src={Tenis1} alt="" />

                            <div className='btn-slide'>
                                <FontAwesomeIcon icon={faChevronLeft} className="botaoNavegacao" onClick={anteriorCor} />
                                <FontAwesomeIcon icon={faChevronRight} className="botaoNavegacao" onClick={proximaCor} />

                            </div>
                        </div>

                        <div className='miniImagens'>
                            {coresFundo.map((cor, index) => (
                                <img key={index} onClick={() => setIndiceCor(index)} src={Tenis1} className={`item${index + 1}`} alt="" />
                            ))}
                        </div>
                    </div>
                    <div className='dadosProduto'>
                        <h1>Tênis Nike Air Force 1</h1>
                        <p className='referenciasProduto'>Casual | Nike | REF:38416711</p>
                        <div className='imgDescProdRow'>
                            <Star />
                            <p className='avaliacao'>4.7 <FaStar /></p>
                            <p className='referenciasAval'>(90 avaliações)</p>
                        </div>
                        <div className='price'>
                            <h2 className='precoProd'><span>R$</span> 559<span>,99</span></h2>
                            <h2 className='precoReal'>R$ 799,99</h2>
                        </div>
                        <h4 className='DescricaoProduto'>Descrição do Produto</h4>
                        <p className='paragProduto'>Sem problemas, todos jogam. Feito com pelo menos 20% de materiais reciclado por peso, o original que escreveu a história dos tênis é atualizado com couro sintético.</p>
                        <h4 className='tamProduto'>Tamanho</h4>
                        <div className='tamanhoSapato'>
                            <SizeButtonShoes />
                        </div>
                        <h4 className='coresProduto'>Cores</h4>
                        <div className='cores'>
                            <ColorButtons />
                        </div>
                        <div>
                            <button className='btn-comprar' onClick={adicionarAoCarrinho}>
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description;