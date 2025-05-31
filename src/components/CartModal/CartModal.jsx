import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Link } from 'react-router-dom';
import './CartModal.css';

export function CartModal({ show, onClose }) {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    buscarCarrinho();

    const atualizar = () => buscarCarrinho();
    window.addEventListener('carrinhoAtualizado', atualizar);
    return () => window.removeEventListener('carrinhoAtualizado', atualizar);
  }, []);

  async function buscarCarrinho() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;
    if (!user) return;

    const { data: carrinhoRaw } = await supabase
      .from('carrinho')
      .select('*')
      .eq('usuario_id', user.id);

    const produtosIds = carrinhoRaw.map(item => item.produto_id);
    const { data: produtos } = await supabase
      .from('produtos')
      .select('*')
      .in('id', produtosIds);

    const carrinhoFinal = carrinhoRaw.map(item => {
      const produto = produtos.find(p => p.id === item.produto_id);
      return { ...item, produto };
    });

    setCarrinho(carrinhoFinal);
  }

  async function esvaziarCarrinho() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;
    if (!user) return;

    await supabase.from('carrinho').delete().eq('usuario_id', user.id);
    buscarCarrinho();
  }

  const total = carrinho.reduce((acc, item) => {
    if (!item.produto) return acc;
    return acc + item.produto.preco * item.quantidade;
  }, 0);

  if (!show) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Meu Carrinho</h3>
        <hr />

        {carrinho.length === 0 ? (
          <p className="carrinho-vazio">Seu carrinho está vazio.</p>
        ) : (
          carrinho.map((item) => (
            <div className="produto" key={item.id}>
              <img
                src={item.produto?.imagem_url}
                alt={item.produto?.nome}
                onError={(e) => (e.target.src = '/fallback.png')}
              />
              <div className="info">
                <p className="nome">{item.produto?.nome}</p>
                <p className="quantidade">Qtd: {item.quantidade}</p>
                <div className="precos">
                  <span className="preco">R$ {item.produto?.preco.toFixed(2)}</span>
                  {item.produto?.preco_original && (
                    <span className="preco-antigo">R$ {item.produto.preco_original.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        <hr />

        <div className="total">
          <span>Valor total:</span>
          <span className="valor">R$ {total.toFixed(2)}</span>
        </div>

        <div className="botoes">
          <button className="esvaziar" onClick={esvaziarCarrinho}>Esvaziar</button>
          <Link to="/meu-carrinho" className="ver-carrinho">Ver Carrinho</Link>
        </div>
      </div>
    </div>
  );
}
