import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import { useNavigate } from 'react-router-dom';
import '../../pages/CarrinhoPage/CarrinhoPage.css';

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    buscarCarrinho();
  }, []);

  async function buscarCarrinho() {
    setLoading(true);

    const { data: carrinhoRaw, error } = await supabase
      .from('carrinho')
      .select('*');

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

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
    setLoading(false);
  }

  async function removerItem(id) {
    await supabase.from('carrinho').delete().eq('id', id);
    buscarCarrinho();
  }

  const subtotal = carrinho.reduce((total, item) => {
    return total + item.produto?.preco * item.quantidade;
  }, 0);

  const desconto = 0;
  const frete = 0;
  const total = subtotal - desconto + frete;

  return (
    <>
      <Header />
      <main className="carrinho-wrapper">
        <h1>Meu Carrinho</h1>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="carrinho-grid">
            <section className="carrinho-esquerda">
              {carrinho.length === 0 ? (
                <div className="carrinho-vazio">
                  Seu carrinho está vazio. <a href="/products">Ver produtos</a>
                </div>
              ) : (
                carrinho.map((item) => (
                  <div className="item-carrinho" key={item.id}>
                    <img src={item.produto.imagem_url} alt={item.produto.nome} />
                    <div className="item-info">
                      <h2>{item.produto.nome}</h2>
                      <p>Cor: {item.produto.cor || '---'} | Tamanho: {item.produto.tamanho || '---'}</p>
                      <p>
                        <span className="risco">R$ {item.produto.preco_original?.toFixed(2)}</span>{' '}
                        <strong>R$ {item.produto.preco.toFixed(2)}</strong>
                      </p>
                      <button onClick={() => removerItem(item.id)} className="btn-remover">
                        Remover item
                      </button>
                    </div>
                    <div className="item-total">
                      <p>Qtd: {item.quantidade}</p>
                      <p>Total: R$ {(item.produto.preco * item.quantidade).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </section>

            <aside className="resumo-direita">
              <h2>Resumo</h2>
              <p><span>Subtotal:</span> <span>R$ {subtotal.toFixed(2)}</span></p>
              <p><span>Frete:</span> <span>R$ {frete.toFixed(2)}</span></p>
              <p><span>Desconto:</span> <span>R$ {desconto.toFixed(2)}</span></p>
              <hr />
              <p className="total"><span>Total:</span> <span>R$ {total.toFixed(2)}</span></p>
              <button
                onClick={() => navigate('/checkout')}
                className="btn-continuar"
                disabled={carrinho.length === 0}
              >
                Continuar
              </button>
            </aside>
          </div>
        )}
        {/* </div> */}
      </main>
      <ProductCard quantidadeProdutos={4} />
      <Footer />
    </>
  );
}