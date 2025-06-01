import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import './MeusPedidos.css';

export default function MeusPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('compras')
        .select('*')
        .eq('usuario_id', user.id)
        .order('criado_em', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setPedidos(data);
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="meus-pedidos-wrapper">
        <h1>Meus Pedidos</h1>
        <div className="sem-pedidos">Carregando seus pedidos...</div>
      </main>
    );
  }

  return (
    <main className="meus-pedidos-wrapper">
      <h1>Meus Pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="sem-pedidos">
          <p>Você ainda não fez nenhum pedido.</p>
          <p>Que tal explorar nossos produtos?</p>
        </div>
      ) : (
        <ul className="lista-pedidos">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className={`pedido-card status-${pedido.status}`}>
              <div className="pedido-info">
                <p><strong>Pedido:</strong> {pedido.id.slice(0, 8)}...</p>
                <p><strong>Data:</strong> {new Date(pedido.criado_em).toLocaleDateString('pt-BR')}</p>
                <p><strong>Total:</strong> R$ {pedido.total.toFixed(2).replace('.', ',')}</p>
                <p><strong>Status:</strong> <span className="status-texto">{pedido.status}</span></p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}