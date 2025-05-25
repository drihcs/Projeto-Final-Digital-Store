import "./ProductPage.css";
import { Link } from "react-router-dom";

import WhiteSneaker from '../../../public/tenis1.png';
import BlueSneaker from '../../../public/tenis2.png';
import LemonSneaker from '../../../public/tenis3.png';
import BlackPuma from '../../../public/tenis4.png';
import RedNike from '../../../public/tenis5.png';
import NikePurple from '../../../public/tenis16.png';
import Balenci1 from '../../../public/tenis7.png';
import Adidas1 from '../../../public/tenis8.png';
import NikeYellow from '../../../public/tenis9.png';
import special from '../../../public/tenis10.png';
import NikeAir from '../../../public/tenis11.png';
import NikeGreen from '../../../public/tenis12.png';
import AdidasPink from '../../../public/tenis13.png';
import AdidasSamba from '../../../public/tenis14.png';
import AdidasCor from '../../../public/tenis15.png';

const products = [
  {
    nome: "Tênis Nike",
    descricao: "Nike Air Force 1",
    preco: "R$ 799,99",
    desconto: "R$ 559,99",
    descPorc: "30% OFF",
    image: WhiteSneaker,
  },
  {
    nome: "Tênis Nike",
    descricao: "Air Jordan 1 Retro High",
    preco: "R$ 749,90",
    desconto: "R$ 524,93",
    descPorc: "30% OFF",
    image: BlueSneaker,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Airmax",
    preco: "R$ 600,00",
    desconto: "R$ 420,00",
    descPorc: "30% OFF",
    image: LemonSneaker,
  },
  {
    nome: "Tênis Puma",
    descricao: "Tênis Puma Roma Basic",
    // preco: "R$ 799,00",
    desconto: "R$ 799,00",
    image: BlackPuma,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Court Borough Low",
    preco: "R$ 898,53",
    desconto: "R$ 628,97",
    descPorc: "30% OFF",
    image: RedNike,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike X Blue Lock Mikage Reo",
    preco: "R$ 1.299,70",
    desconto: "R$ 909,79",
    descPorc: "30% OFF",
    image: NikePurple,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Tênis Balenciaga Tripe S",
    // preco: "R$3.185,00",
    desconto: "R$ 3.185,00",
    // descPorc: "20% OFF",
    image: Balenci1,
  },
  {
    nome: "Tênis Adidas",
    descricao: "Adidas Superstar",
    // preco: "$1200",
    desconto: "R$ 699,99",
    // descPorc: "20% OFF",
    image: Adidas1,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Air Force 1 Low",
    preco: "R$ 1925,52",
    desconto: "R$ 1.347,86",
    descPorc: "30% OFF",
    image: NikeYellow,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike SB Dunk High Premium",
    preco: "R$ 2.258,68",
    desconto: "R$ 1.581,07",
    descPorc: "30% OFF",
    image: special,
  },
  {
    nome: "Tênis Nike",
    descricao: "Air Jordan 3 Retro Midnight Navy",
    preco: "R$ 1.038,70",
    desconto: "R$ 727,09",
    descPorc: "30% OFF",
    image: NikeAir,
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Air Force 1 Volt",
    preco: "R$ 739,99",
    desconto: "R$ 517,99",
    descPorc: "30% OFF",
    image: NikeGreen,
  },
  {
    nome: "Tênis Adidas",
    descricao: "Adidas Campus 00s",
    // preco: "$1200",
    desconto: "R$ 599,90",
    // descPorc: "20% OFF",
    image: AdidasPink,
  },
  {
    nome: "Tênis Adidas",
    descricao: "Adidas Samba Vegan",
    // preco: "$1200",
    desconto: "R$ 699,90",
    // descPorc: "20% OFF",
    image: AdidasSamba,
  },
  {
    nome: "Tênis Adidas",
    descricao: "Adidas Forum Low Cl x Simpsons",
    // preco: "$1200",
    desconto: "R$ 819,00",
    // descPorc: "20% OFF",
    image: AdidasCor,
  },
];

export function ProductPage() {
  return (
    <div className="bg-color">
      <section className="prodCard">
        <div className="first">
          <h2>Resultados para "Tênis" - <span>{products.length} produtos</span></h2>
          <div className="ordenar-por">
            <span>Ordenar por:</span>
            <select id="ordenacao" name="ordenacao">
              <option value="mais-relevantes">Mais relevantes</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
            </select>
          </div>
        </div>

        <div className="content">
          <aside className="filter">
            <p>Filtrar por</p>
            <hr />
            <p>Marca</p>
            <form>
              {["Adidas", "Balenciaga", "K-Swiss", "Nike", "Puma"].map((brand, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    defaultChecked={brand === "Adidas" || brand === "K-Swiss"}
                  />
                  <label>{brand}</label>
                </div>
              ))}
            </form>
            <p>Categoria</p>
            <form>
              {["Esporte e lazer", "Casual", "Utilitário", "Corrida"].map((category, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    defaultChecked={category === "Esporte e lazer"}
                  />
                  <label>{category}</label>
                </div>
              ))}
            </form>
            <p>Gênero</p>
            <form>
              {["Masculino", "Feminino", "Unissex"].map((gender, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    defaultChecked={gender === "Masculino" || gender === "Feminino"}
                  />
                  <label>{gender}</label>
                </div>
              ))}
            </form>
            <p>Estado</p>
            <div>
              <input type="radio" name="estado" defaultChecked />
              <label>Novo</label>
            </div>
            <div>
              <input type="radio" name="estado" />
              <label>Usado</label>
            </div>
          </aside>

          <div className="second">
            {products.map((produto, index) => (
              <Link to="/viewProduct" key={index} className="prod-page-item">
                <div className="prod-page-image">
                  <img src={produto.image} alt={produto.nome} />
                  {produto.descPorc && (
                    <p className="prod-page-descPorc">{produto.descPorc}</p>
                  )}
                </div>
                <p className="prod-page-nome">{produto.nome}</p>
                <p className="prod-page-descricao">{produto.descricao}</p>
                <div className="prod-page-prices">
                  <p className="prod-page-price">{produto.preco}</p>
                  <p className="prod-page-priceDisc">{produto.desconto}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
