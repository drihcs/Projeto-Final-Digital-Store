import './Description.css';
import React, { useState } from 'react';
import Star from '../Stars/Stars';
import { FaStar } from 'react-icons/fa';
import ColorShoes from '../ColorsShoes/ColorShoes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SizeButtonShoes from '../SizeButton/SizeButton';

import Tenis1 from '../../../public/detalhes.png';

const coresFundo = [
    { cor: '#E2E3FF' },
    { cor: '#FFE8BC' },
    { cor: '#FFC0BC' },
    { cor: '#DEC699' },
    { cor: '#E8DFCF' }
];

export function DescProduct() {
    const [indiceCor, setIndiceCor] = useState(0);

    const proximaCor = () => {
        setIndiceCor((indiceCor + 1) % coresFundo.length);
    };

    const anteriorCor = () => {
        setIndiceCor((indiceCor - 1 + coresFundo.length) % coresFundo.length);
    };

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
                            {/* Botões de navegação */}
                            <div className='btn-slide'>
                                <FontAwesomeIcon icon={faChevronLeft} className="botaoNavegacao" onClick={anteriorCor} />
                                <FontAwesomeIcon icon={faChevronRight} className="botaoNavegacao" onClick={proximaCor} />

                            </div>
                        </div>
                        {/* Miniaturas de imagens (alteram o slide de cor) */}
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
                            <ColorShoes />
                        </div>
                        <div>
                            <button className='btn-comprar'>Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DescProduct;