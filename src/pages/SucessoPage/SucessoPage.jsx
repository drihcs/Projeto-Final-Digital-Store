import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './SucessoPage.css';

export default function SucessoPage() {
  const [compra, setCompra] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarCompra();
  }, []);

  async function carregarCompra() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;
    if (!user) return;

    const { data: compras } = await supabase
      .from('compras')
      .select('*')
      .eq('usuario_id', user.id)
      .order('criado_em', { ascending: false })
      .limit(1);

    if (compras?.length > 0) {
      setCompra(compras[0]);
    }
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
                {compra.endereco_entrega.split(',').map((linha, i) => (
                  <p key={i}>{linha.trim()}</p>
                ))}
              </section>

              <section>
                <h3>Informações de Pagamento</h3>
                <p><strong>Forma:</strong> {compra.forma_pagamento === 'cartao' ? 'Cartão de Crédito' : 'Boleto Bancário'}</p>
                <p><strong>Final:</strong> ************2020</p>
              </section>

              <section className="resumo-compra">
                <h3>Resumo da compra</h3>
                <div className="produto-item">
                  <img src="/produto-exemplo.png" alt="Produto" />
                  <p>Tênis Nike Revolution 6 Next Nature Masculino</p>
                </div>

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
