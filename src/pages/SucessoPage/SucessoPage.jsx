import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './SucessoPage.css';

export default function SucessoPage() {
  const [compra, setCompra] = useState(null);
  const [produtosResumo, setProdutosResumo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const carregarProdutosDaCompra = useCallback(async (compraId) => {
    try {
      const { data: itensCompra, error: errorItens } = await supabase
        .from('compras_produtos')
        .select(`
          *,
          produto:produtos(
            id,
            nome,
            imagem_url,
            preco
          )
        `)
        .eq('compra_id', compraId);

      if (errorItens) {
        console.error('Erro ao buscar produtos da compra:', errorItens);
        return;
      }

      console.log('Produtos da compra carregados:', itensCompra);

      if (itensCompra && itensCompra.length > 0) {
        const produtos = itensCompra.map(item => ({
          ...item.produto,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario
        }));
        setProdutosResumo(produtos);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }, []);

  const carregarProdutosFallback = useCallback(async (compraId) => {
    try {
      await carregarProdutosDaCompra(compraId);
    } catch (error) {
      console.warn('Não foi possível carregar produtos:', error);
    }
  }, [carregarProdutosDaCompra]);

  useEffect(() => {
    async function carregarCompra() {
      try {
        setLoading(true);
        setErro(null);

        console.log('=== INICIANDO CARREGAMENTO DA COMPRA ===');

        let compraId = localStorage.getItem('ultimaCompraId');
        let dadosLocalStorage = null;

        try {
          const dadosString = localStorage.getItem('ultimaCompraDados');
          if (dadosString) {
            dadosLocalStorage = JSON.parse(dadosString);
            if (!compraId && dadosLocalStorage.id) {
              compraId = dadosLocalStorage.id;
            }
          }
        } catch (e) {
          console.warn('Erro ao parsear dados do localStorage:', e);
        }

        console.log('CompraId encontrado:', compraId);
        console.log('Dados localStorage:', dadosLocalStorage);

        if (!compraId) {
          const urlParams = new URLSearchParams(window.location.search);
          compraId = urlParams.get('compraId') || urlParams.get('id');
          console.log('CompraId da URL:', compraId);
        }

        if (!compraId && dadosLocalStorage && dadosLocalStorage.id) {
          compraId = dadosLocalStorage.id;
          console.log('Usando ID dos dados localStorage:', compraId);
        }

        if (!compraId) {
          console.error('ERRO: Nenhum ID de compra encontrado!');
          setErro('ID da compra não encontrado. Redirecionando para a home...');
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        console.log('Buscando compra com ID:', compraId);

        const { data: compraData, error } = await supabase
          .from('compras')
          .select('*')
          .eq('id', compraId)
          .single();

        if (error) {
          console.error('Erro ao carregar compra do banco:', error);

          if (dadosLocalStorage) {
            console.log('Usando dados do localStorage como fallback');
            setCompra(dadosLocalStorage);

            await carregarProdutosFallback(compraId);
          } else {
            setErro(`Erro ao carregar dados da compra: ${error.message}`);
          }
          return;
        }

        if (!compraData) {
          console.error('Compra não encontrada no banco de dados');

          if (dadosLocalStorage) {
            console.log('Compra não encontrada no banco, usando localStorage');
            setCompra(dadosLocalStorage);
            await carregarProdutosFallback(compraId);
          } else {
            setErro('Compra não encontrada.');
          }
          return;
        }

        console.log('Compra carregada com sucesso:', compraData);
        setCompra(compraData);

        await carregarProdutosDaCompra(compraId);

      } catch (error) {
        console.error('Erro geral ao carregar compra:', error);
        setErro('Erro inesperado ao carregar os dados da compra.');
      } finally {
        setLoading(false);
      }
    }

    carregarCompra();
  }, [navigate, carregarProdutosDaCompra, carregarProdutosFallback]);

  const voltarParaHome = useCallback(() => {

    localStorage.removeItem('ultimaCompraId');
    localStorage.removeItem('ultimaCompraDados');
    navigate('/');
  }, [navigate]);

  return (
    <>
      <Header />
      <main className="sucesso-wrapper">
        <div className="sucesso-box">
          <div className="icone-sucesso">🎉</div>
          <h1>Compra Realizada<br />com sucesso!</h1>

          {loading ? (
            <div className="loading-container">
              <p>Carregando dados da compra...</p>
              <div style={{ background: '#f8f9fa', padding: '15px', marginTop: '20px', borderRadius: '5px' }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  <strong>Aguarde...</strong> Estamos buscando os dados da sua compra.
                </p>
              </div>
            </div>
          ) : erro ? (
            <div className="erro-container">
              <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{erro}</p>
              <button
                className="btn-voltar"
                onClick={voltarParaHome}
                style={{ marginTop: '20px' }}
              >
                Voltar para Home
              </button>
            </div>
          ) : compra ? (
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

                  const endereco = compra.endereco_entrega || '';
                  const partes = endereco.split(',').map(p => p.trim());

                  return (
                    <>
                      <p><strong>Rua:</strong> {partes[0] || 'Não informado'}</p>
                      <p><strong>Bairro:</strong> {partes[1] || 'Não informado'}</p>
                      <p><strong>Cidade:</strong> {partes[2] || 'Não informado'}</p>
                      <p><strong>CEP:</strong> {partes[3] || 'Não informado'}</p>
                      {partes[4] && partes[4] !== 'undefined' && (
                        <p><strong>Complemento:</strong> {partes[4]}</p>
                      )}
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
                      <img
                        src={produto.imagem_url}
                        alt={produto.nome}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <div>
                        <p>{produto.nome}</p>
                        {produto.quantidade && (
                          <small>Quantidade: {produto.quantidade}</small>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Carregando produtos...</p>
                )}

                <div className="total-box">
                  <p className="label">Total</p>
                  <p className="valor">R$ {compra.total ? compra.total.toFixed(2) : '0.00'}</p>
                  <span className="parcelado">
                    ou 10x de R$ {compra.total ? (compra.total / 10).toFixed(2) : '0.00'} sem juros
                  </span>
                </div>

                {compra.forma_pagamento === 'boleto' && (
                  <a
                    className="link-imprimir"
                    href="/boleto-fake.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visualizar Boleto
                  </a>
                )}
              </section>

              <button className="btn-voltar" onClick={voltarParaHome}>
                Voltar para Home
              </button>
            </div>
          ) : (
            <div>
              <p>Dados da compra não encontrados.</p>
              <button className="btn-voltar" onClick={voltarParaHome}>
                Voltar para Home
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}