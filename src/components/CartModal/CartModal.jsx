import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import "./CartModal.css";

export function CartModal({ show, onClose }) {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    async function carregarCarrinho() {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      if (!user) return;

      const { data: itens } = await supabase
        .from("carrinho")
        .select("*")
        .eq("usuario_id", user.id);

      const ids = itens.map((i) => i.produto_id);
      const { data: produtos } = await supabase
        .from("produtos")
        .select("*")
        .in("id", ids);

      const carrinhoCompleto = itens.map((item) => ({
        ...item,
        produto: produtos.find((p) => p.id === item.produto_id),
      }));

      setCarrinho(carrinhoCompleto);
    }

    carregarCarrinho();

    function atualizarCarrinho() {
      carregarCarrinho();
    }
    window.addEventListener("carrinhoAtualizado", atualizarCarrinho);
    return () => window.removeEventListener("carrinhoAtualizado", atualizarCarrinho);
  }, []);

  if (!show) return null;

  const total = carrinho.reduce((acc, item) => acc + item.produto?.preco * item.quantidade, 0);

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Meu Carrinho</h3>
        <hr />

        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          carrinho.map((item) => (
            <div className="produto" key={item.id}>
              <img src={item.produto.imagem_url} alt={item.produto.nome} />
              <div className="info">
                <p className="nome">{item.produto.nome}</p>
                <div className="precos">
                  <span className="preco">R$ {item.produto.preco.toFixed(2)}</span>
                  {item.produto.preco_original && (
                    <span className="preco-antigo">
                      R$ {item.produto.preco_original.toFixed(2)}
                    </span>
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
          <button
            className="esvaziar"
            onClick={async () => {
              const { data: sessionData } = await supabase.auth.getSession();
              const user = sessionData?.session?.user;
              if (user) {
                await supabase.from("carrinho").delete().eq("usuario_id", user.id);
                setCarrinho([]);
              }
            }}
          >
            Esvaziar
          </button>
          <Link to="/meu-carrinho" className="ver-carrinho">
            Ver Carrinho
          </Link>
        </div>
      </div>
    </div>
  );
}
