import "./ProductCard.css";
import { Link } from "react-router-dom";
import ArrowRight from "../../assets/right-arrow.svg";
import Adidas from "../../../public/tenis8.png";
import WhiteSneaker from '../../../public/tenis1.png'
import BlueSneaker from '../../../public/tenis2.png'
import LemonSneaker from '../../../public/tenis3.png'
import BlackPuma from '../../../public/tenis4.png'
import RedNike from '../../../public/tenis5.png'
import NikePurple from '../../../public/tenis16.png'
import Balenci1 from '../../../public/tenis7.png'

const products = [
  {
    nome: "Tênis Nike",
    descricao: "Nike Air Force 1",
    descPorc: "30% OFF",
    preco: "R$ 799,99",
    desconto: "R$ 559,99",
    image: WhiteSneaker,
  },
  {
    nome: "Tênis Nike",
    descricao: "Air Jordan 1 Retro High",
    descPorc: "30% OFF",
    preco: "R$ 749,90",
    desconto: "R$ 524,93",
    image: BlueSneaker,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Airmax",
    descPorc: "30% OFF",
    preco: "R$ 600,00",
    desconto: "R$ 420,00",
    image: LemonSneaker,
  },
  {
    nome: "Tênis Puma",
    descricao: "Tênis Puma Roma Basic",
    // preco: "R$ 699,99",
    desconto: "R$ 799,00",
    image: BlackPuma,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Court Borough Low",
    descPorc: "30% OFF",
    preco: "R$ 898,53",
    desconto: "R$ 628,97",
    image: RedNike,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike X Blue Lock Mikage Reo",
    descPorc: "30% OFF",
    preco: "R$ 1.299,70",
    desconto: "R$ 909,79",
    image: NikePurple,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Tênis Balenciaga Tripe S",
    // preco: "R$3.185,00",
    desconto: "R$ 3.185,00",
    image: Balenci1,
  },
  {
    nome: "Tênis Adidas",
    descricao: "Adidas Superstar",
    // preco: "R$ 799,00",
    desconto: "R$ 699,99",
    image: Adidas,
  },
];

export function ProductCard({ quantidadeProdutos }) {
  const produtosParaMostrar = products.slice(0, quantidadeProdutos);

  return (
    <div className="prod-card-bg">
      <section className="prod-card">
        <div className="prod-card-header">
          <h2>Produtos em alta</h2>
          <Link to="/products">
            Ver todos <img src={ArrowRight} alt="" />
          </Link>
        </div>
        <div className="prod-card-grid">
          {produtosParaMostrar.map((produto, index) => (
            <div key={index} className="prod-card-item">
              <div className="prod-card-image">
                <img src={produto.image} alt={produto.nome} />
                {produto.descPorc && <p className="prod-card-descPorc">{produto.descPorc}</p>}
              </div>
              <p className="prod-card-name">{produto.nome}</p>
              <p className="prod-card-desc">{produto.descricao}</p>
              <div className="prod-card-prices">
                <p className="prod-card-price">{produto.preco}</p>
                <p className="prod-card-priceDisc">{produto.desconto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
