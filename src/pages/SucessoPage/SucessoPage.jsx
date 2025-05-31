import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './SucessoPage.css';

export default function SucessoPage() {
  const [compra, setCompra] = useState(null);
  const [produtosResumo, setProdutosResumo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarCompra();
  }, []);

  async function carregarCompra() {
    const compraId = localStorage.getItem('ultimaCompraId');
    if (!compraId) return;

    const { data: compraData, error } = await supabase
      .from('compras')
      .select('*')
      .eq('id', compraId)
      .single();

    if (error || !compraData) {
      console.error('Erro ao carregar compra:', error?.message);
      return;
    }

    setCompra(compraData);

    // Carrega produtos da compra
    const { data: itensCompra, error: errorItens } = await supabase
      .from('compras_produtos')
      .select('*, produto:produtos(id, nome, imagem_url)')
      .eq('compra_id', compraId);

    if (errorItens) {
      console.error('Erro ao buscar produtos da compra:', errorItens.message);
      return;
    }

    const produtos = itensCompra.map(item => item.produto);
    setProdutosResumo(produtos);
  }

  return (
    <>
      <Header />
      <main className="sucesso-wrapper">
        <div className="sucesso-box">
          <div className="icone-sucesso">🎉</div>
          <h1>Compra Realizada<br />com sucesso!</h1>

          {compra ? (
            <div className="sucesso-conteudo">
              <section>
                <h3>Informações Pessoais</h3>
                <p><strong>Nome:</strong> {compra.nome}</p>
                <p><strong>CPF:</strong> {compra.cpf}</p>
                <p><strong>Email:</strong> {compra.email}</p>
                <p><strong>Celular:</strong> {compra.telefone}</p>
              </section>

              <section>
                <h3>Informações de Entrega</h3>
                {(() => {
                  const partes = compra.endereco_entrega.split(',');
                  return (
                    <>
                      <p><strong>Rua:</strong> {partes[0]?.trim()}</p>
                      <p><strong>Bairro:</strong> {partes[1]?.trim()}</p>
                      <p><strong>Cidade:</strong> {partes[2]?.trim()}</p>
                      <p><strong>CEP:</strong> {partes[3]?.trim()}</p>
                      {partes[4] && <p><strong>Complemento:</strong> {partes[4]?.trim()}</p>}
                    </>
                  );
                })()}
              </section>

              <section>
                <h3>Informações de Pagamento</h3>
                <p><strong>Forma:</strong> {compra.forma_pagamento === 'cartao' ? 'Cartão de Crédito' : 'Boleto Bancário'}</p>
                {compra.forma_pagamento === 'cartao' && (
                  <p><strong>Final:</strong> ************2020</p>
                )}
              </section>

              <section className="resumo-compra">
                <h3>Resumo da compra</h3>
                {produtosResumo.length > 0 ? (
                  produtosResumo.map((produto, index) => (
                    <div key={index} className="produto-item">
                      <img src={produto.imagem_url} alt={produto.nome} />
                      <p>{produto.nome}</p>
                    </div>
                  ))
                ) : (
                  <p>Nenhum produto encontrado.</p>
                )}

                <div className="total-box">
                  <p className="label">Total</p>
                  <p className="valor">R$ {compra.total?.toFixed(2)}</p>
                  <span className="parcelado">ou 10x de R$ {(compra.total / 10).toFixed(2)} sem juros</span>
                </div>

                <a
                  className="link-imprimir"
                  href="/boleto-fake.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visualizar Boleto
                </a>
              </section>

              <button className="btn-voltar" onClick={() => navigate('/')}>Voltar para Home</button>
            </div>
          ) : (
            <p>Carregando dados da compra...</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
