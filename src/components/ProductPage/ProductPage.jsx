import "./ProductPage.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

const initialProducts = [
  {
    nome: "Tênis Nike",
    descricao: "Nike Air Force 1",
    preco: "R$ 799,99",
    desconto: "R$ 559,99",
    descPorc: "30% OFF",
    image: WhiteSneaker,
    marca: "Nike",
    categoria: "Casual",
    genero: "Unissex",
  },
  {
    nome: "Tênis Nike",
    descricao: "Air Jordan 1 Retro High",
    preco: "R$ 749,90",
    desconto: "R$ 524,93",
    descPorc: "30% OFF",
    image: BlueSneaker,
    marca: "Nike",
    categoria: "Esporte e lazer",
    genero: "Masculino",
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Airmax",
    preco: "R$ 600,00",
    desconto: "R$ 420,00",
    descPorc: "30% OFF",
    image: LemonSneaker,
    marca: "Nike",
    categoria: "Corrida",
    genero: "Masculino",
  },
  {
    nome: "Tênis Puma",
    descricao: "Tênis Puma Roma Basic",
    desconto: "R$ 799,00",
    image: BlackPuma,
    marca: "Puma",
    categoria: "Casual",
    genero: "Unissex",
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Court Borough Low",
    preco: "R$ 898,53",
    desconto: "R$ 628,97",
    descPorc: "30% OFF",
    image: RedNike,
    marca: "Nike",
    categoria: "Casual",
    genero: "Feminino",
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike X Blue Lock Mikage Reo",
    preco: "R$ 1.299,70",
    desconto: "R$ 909,79",
    descPorc: "30% OFF",
    image: NikePurple,
    marca: "Nike",
    categoria: "Esporte e lazer",
    genero: "Feminino",
  },
  {
    nome: "Tênis Balenciaga",
    descricao: "Tênis Balenciaga Tripe S",
    desconto: "R$ 3.185,00",
    image: Balenci1,
    marca: "Balenciaga",
    categoria: "Utilitário",
    genero: "Masculino",
  },
  {
    nome: "Tênis Adidas",
    descricao: "Adidas Superstar",
    desconto: "R$ 699,99",
    image: Adidas1,
    marca: "Adidas",
    categoria: "Casual",
    genero: "Unissex",
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Air Force 1 Low",
    preco: "R$ 1.925,52",
    desconto: "R$ 1.347,86",
    descPorc: "30% OFF",
    image: NikeYellow,
    marca: "Nike",
    categoria: "Casual",
    genero: "Masculino",
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike SB Dunk High Premium",
    preco: "R$ 2.258,68",
    desconto: "R$ 1.581,07",
    descPorc: "30% OFF",
    image: special,
    marca: "Nike",
    categoria: "Esporte e lazer",
    genero: "Masculino",
  },
  {
    nome: "Tênis Nike",
    descricao: "Air Jordan 3 Retro Midnight Navy",
    preco: "R$ 1.038,70",
    desconto: "R$ 727,09",
    descPorc: "30% OFF",
    image: NikeAir,
    marca: "Nike",
    categoria: "Esporte e lazer",
    genero: "Masculino",
  },
  {
    nome: "Tênis Nike",
    descricao: "Nike Air Force 1 Volt",
    preco: "R$ 739,99",
    desconto: "R$ 517,99",
    descPorc: "30% OFF",
    image: NikeGreen,
    marca: "Nike",
    categoria: "Casual",
    genero: "Masculino",
  },
  {
    nome: "Tênis Adidas",
    descricao: "Adidas Campus 00s",
    desconto: "R$ 599,90",
    image: AdidasPink,
    marca: "Adidas",
    categoria: "Casual",
    genero: "Feminino",
  },
  {
    nome: "Tênis Adidas",
    descricao: "Adidas Samba Vegan",
    desconto: "R$ 699,90",
    image: AdidasSamba,
    marca: "Adidas",
    categoria: "Casual",
    genero: "Unissex",
  },
  {
    nome: "Tênis Adidas",
    descricao: "Adidas Forum Low Cl x Simpsons",
    desconto: "R$ 819,00",
    image: AdidasCor,
    marca: "Adidas",
    categoria: "Casual",
    genero: "Feminino",
  },
];

export function ProductPage() {
  const [sortOption, setSortOption] = useState("mais-relevantes");
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState(initialProducts);

  // Estados para os filtros
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(""); // Para o radio button

  // Função para normalizar e converter preços para números
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace("R$", "").replace(/\./g, "").replace(",", "."));
  };

  // ----- Lógica de Filtragem e Ordenação Principal -----
  useEffect(() => {
    let currentProducts = [...initialProducts]; // Começa com a lista completa de produtos

    // 1. Aplicar Filtros
    // Filtro por Marca
    if (selectedBrands.length > 0) {
      currentProducts = currentProducts.filter(product =>
        selectedBrands.includes(product.marca)
      );
    }

    // Filtro por Categoria
    if (selectedCategories.length > 0) {
      currentProducts = currentProducts.filter(product =>
        selectedCategories.includes(product.categoria)
      );
    }

    // Filtro por Gênero
    if (selectedGenders.length > 0) {
      currentProducts = currentProducts.filter(product =>
        selectedGenders.includes(product.genero)
      );
    }

    // Filtro por Condição (se você tiver essa propriedade nos seus produtos)
    // Exemplo: if (selectedCondition === "Usado") { ... }
    // Por enquanto, não há 'condição' nos produtos, então essa parte seria adicionada depois.

    // 2. Aplicar Ordenação
    switch (sortOption) {
      case "menor-preco":
        currentProducts.sort((a, b) => {
          const priceA = parsePrice(a.desconto || a.preco);
          const priceB = parsePrice(b.desconto || b.preco);
          return priceA - priceB;
        });
        break;
      case "maior-preco":
        currentProducts.sort((a, b) => {
          const priceA = parsePrice(a.desconto || a.preco);
          const priceB = parsePrice(b.desconto || b.preco);
          return priceB - priceA;
        });
        break;
      case "mais-relevantes":
      default:
        // Se a ordem inicial é baseada em alguma relevância, você pode manter essa lógica aqui.
        // Por simplicidade, para "mais relevantes" após filtro, ele manterá a ordem original dos produtos filtrados.
        // Se precisar de uma ordem específica para "mais relevantes", você precisaria de um critério de relevância.
        break;
    }

    setFilteredAndSortedProducts(currentProducts);
  }, [sortOption, selectedBrands, selectedCategories, selectedGenders, selectedCondition]); // Todas as dependências dos filtros e ordenação

  // ----- Manipuladores de Evento -----

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrands(prevBrands =>
      event.target.checked
        ? [...prevBrands, brand]
        : prevBrands.filter(b => b !== brand)
    );
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategories(prevCategories =>
      event.target.checked
        ? [...prevCategories, category]
        : prevCategories.filter(c => c !== category)
    );
  };

  const handleGenderChange = (event) => {
    const gender = event.target.value;
    setSelectedGenders(prevGenders =>
      event.target.checked
        ? [...prevGenders, gender]
        : prevGenders.filter(g => g !== gender)
    );
  };

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
  };

  return (
    <div className="bg-color">
      <section className="prodCard">
        <div className="first">
          <h2>Resultados para "Tênis" - <span>{filteredAndSortedProducts.length} produtos</span></h2>
          <div className="ordenar-por">
            <span>Ordenar por:</span>
            <select
              id="ordenacao"
              name="ordenacao"
              value={sortOption}
              onChange={handleSortChange}
            >
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
                    value={brand} // O valor do checkbox
                    checked={selectedBrands.includes(brand)} // Se está selecionado
                    onChange={handleBrandChange} // Manipulador de evento
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
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
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
                    value={gender}
                    checked={selectedGenders.includes(gender)}
                    onChange={handleGenderChange}
                  />
                  <label>{gender}</label>
                </div>
              ))}
            </form>
            <p>Estado</p>
            <div>
              <input
                type="radio"
                name="estado"
                value="Novo"
                checked={selectedCondition === "Novo"}
                onChange={handleConditionChange}
              />
              <label>Novo</label>
            </div>
            <div>
              <input
                type="radio"
                name="estado"
                value="Usado"
                checked={selectedCondition === "Usado"}
                onChange={handleConditionChange}
              />
              <label>Usado</label>
            </div>
          </aside>

          <div className="second">
            {filteredAndSortedProducts.map((produto, index) => (
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
                  {produto.preco && <p className="prod-page-price">{produto.preco}</p>}
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