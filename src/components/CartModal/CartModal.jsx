import { Link } from "react-router-dom";
import "./CartModal.css";
import tenisVermelho from "../../../public/tenis1.png";
import tenisAzul from "../../../public/tenis2.png";

export function CartModal({ show, onClose }) {
  if (!show) return null;

  const produtos = [
    {
      id: 1,
      nome: "Tênis Nike Air Force 1 Next Nature - Feminino",
      preco: 599.99,
      precoOriginal: 799.99,
      imagem: tenisVermelho,
    },
    {
      id: 2,
      nome: "Tênis Nike Air Jordan 1 Mid",
      preco: 524.93,
      precoOriginal: 749.90,
      imagem: tenisAzul,
    },
  ];

  const total = produtos.reduce((acc, item) => acc + item.preco, 0);

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Meu Carrinho</h3>
        <hr />

        {produtos.map((produto) => (
          <div className="produto" key={produto.id}>
            <img src={produto.imagem} alt={produto.nome} />
            <div className="info">
              <p className="nome">{produto.nome}</p>
              <div className="precos">
                <span className="preco">R$ {produto.preco.toFixed(2)}</span>
                <span className="preco-antigo">R$ {produto.precoOriginal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}

        <hr />

        <div className="total">
          <span>Valor total:</span>
          <span className="valor">R$ {total.toFixed(2)}</span>
        </div>

        <div className="botoes">
          <button className="esvaziar" onClick={() => alert("Carrinho esvaziado!")}>Esvaziar</button>
          <Link to="/pedidos" className="ver-carrinho">Ver Carrinho</Link>
        </div>
      </div>
    </div>
  );
}
