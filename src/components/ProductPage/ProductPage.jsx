import "./ProductPage.css";
import { Link } from "react-router-dom";

// Imagens dos produtos
import WhiteSneaker from '../../../public/tenis1.png';
import BlueSneaker from '../../../public/tenis2.png';
import LemonSneaker from '../../../public/tenis3.png';
import BlackPuma from '../../../public/tenis4.png';
import RedNike from '../../../public/tenis5.png';
import BluePuma from '../../../public/tenis6.png';
import Balenci1 from '../../../public/tenis7.png';

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
    nome: "Tênis Nike Air",
    descricao: "Air Jordan 1 Mid",
    preco: "R$ 749,90",
    desconto: "R$ 524,93",
    descPorc: "30% OFF",
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
    image: BlackPuma,
  },
  {
    nome: "Tênis Puma",
    descricao: "Puma Roma",
    preco: "R$ 699,99",
    desconto: "R$ 571,70",
    image: RedNike,
  },
  {
    nome: "Tênis Nike",
    descricao: "Puma Flyer Runner",
    preco: "$320",
    desconto: "$256",
    descPorc: "20% OFF",
    image: BluePuma,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Balenciaga Speed",
    preco: "$1200",
    desconto: "$960",
    descPorc: "20% OFF",
    image: Balenci1,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Balenciaga Speed",
    preco: "$1200",
    desconto: "$960",
    descPorc: "20% OFF",
    image: Balenci1,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Balenciaga Speed",
    preco: "$1200",
    desconto: "$960",
    descPorc: "20% OFF",
    image: Balenci1,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Balenciaga Speed",
    preco: "$1200",
    desconto: "$960",
    descPorc: "20% OFF",
    image: Balenci1,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Balenciaga Speed",
    preco: "$1200",
    desconto: "$960",
    descPorc: "20% OFF",
    image: Balenci1,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Balenciaga Speed",
    preco: "$1200",
    desconto: "$960",
    descPorc: "20% OFF",
    image: Balenci1,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Balenciaga Speed",
    preco: "$1200",
    desconto: "$960",
    descPorc: "20% OFF",
    image: Balenci1,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Balenciaga Speed",
    preco: "$1200",
    desconto: "$960",
    descPorc: "20% OFF",
    image: Balenci1,
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Balenciaga Speed",
    preco: "$1200",
    desconto: "$960",
    descPorc: "20% OFF",
    image: Balenci1,
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
