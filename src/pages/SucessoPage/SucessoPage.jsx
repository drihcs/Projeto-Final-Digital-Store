import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './SucessoPage.css';

export default function SucessoPage() {
  const [ultimaCompra, setUltimaCompra] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    buscarUltimaCompra();
  }, []);

  async function buscarUltimaCompra() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;
    if (!user) return;

    const { data: compras } = await supabase
      .from('compras')
      .select('*')
      .eq('usuario_id', user.id)
      .order('criado_em', { ascending: false })
      .limit(1);

    if (compras && compras.length > 0) {
      setUltimaCompra(compras[0]);
    }
  }

  return (
    <>
      <Header />
      <main className="sucesso-container">
        <div className="recibo">
          <h1>Compra Realizada com Sucesso!</h1>

          {ultimaCompra ? (
            <div className="recibo-conteudo">
              <p><strong>Nome:</strong> {ultimaCompra.nome}</p>
              <p><strong>E-mail:</strong> {ultimaCompra.email}</p>
              <p><strong>CPF:</strong> {ultimaCompra.cpf}</p>
              <p><strong>Endereço:</strong> {ultimaCompra.endereco_entrega}</p>
              <p><strong>Forma de Pagamento:</strong> {ultimaCompra.forma_pagamento}</p>
              <p><strong>Total:</strong> R$ {ultimaCompra.total?.toFixed(2)}</p>

              <button
                className="btn-boleto"
                onClick={() => window.open('/boleto-fake.pdf', '_blank')}
              >
                Visualizar Boleto
              </button>

              <button
                className="btn-voltar"
                onClick={() => navigate('/')}
              >
                Voltar para Home
              </button>
            </div>
          ) : (
            <p>Carregando detalhes da compra...</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
