import "./ProductCard.css";
import { Link } from "react-router-dom";
import ArrowRight from "../../assets/right-arrow.svg";
import kSwiss from "../../assets/tenisCard.svg";
import WhiteSneaker from '../../../public/tenis1.png'
import BlueSneaker from '../../../public/tenis2.png'
import LemonSneaker from '../../../public/tenis3.png'
import BlackPuma from '../../../public/tenis4.png'
import RedNike from '../../../public/tenis5.png'
import BluePuma from '../../../public/tenis6.png'
import Balenci1 from '../../../public/tenis7.png'

const products = [
  {
    nome: "Tênis Nike",
    descricao: "Tênis Nike Air Force 1 Next Nature - Feminino",
    descPorc: "30% OFF",
    preco: "R$ 799,99",
    desconto: "R$ 559,99",
    image: WhiteSneaker,
  },
  {
    nome: "Tênis Nike Air",
    descricao: "Air Jordan 1 Mid",
    descPorc: "30% OFF",
    preco: "R$ 749,90",
    desconto: "R$ 524,93",
    image: BlueSneaker,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Airmax",
    preco: "R$ 600,00",
    desconto: "R$ 569,90",
    image: LemonSneaker,
  },
  {
    nome: "Tênis K-Swiss",
    descricao: "K-Swiss V8",
    preco: "R$ 799,00",
    desconto: "R$ 499,99",
    image: kSwiss,
  },
  {
    nome: "Tênis Puma",
    descricao: "Puma Roma",
    preco: "R$ 699,99",
    desconto: "R$ 571,70",
    image: BlackPuma,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Court Borough",
    preco: "R$ 899,90",
    desconto: "R$ 799,90",
    image: RedNike,
  },
  {
    nome: "Tênis Puma",
    descricao: "Puma Suede XL Hairy",
    preco: "R$ 649,99",
    desconto: "R$ 479,99",
    image: BluePuma,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Huarache Run",
    preco: "R$ 699,90",
    desconto: "R$ 528,29",
    image: Balenci1,
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
