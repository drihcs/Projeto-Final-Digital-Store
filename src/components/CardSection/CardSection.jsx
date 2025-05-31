import "./CardSection.css";
import { Link } from "react-router-dom";
import { ButtonCard } from "../Buttons/Button";

import collection1 from "../../../public/collection1.png";
import collection2 from "../../../public/collection2.png";
import collection3 from "../../../public/collection3.png";

const collections = [
  { image: collection1, offer: "15% OFF", title: "Novo Drop Supreme" },
  { image: collection2, offer: "10% OFF", title: "Coleção Adidas" },
  { image: collection3, offer: "20% OFF", title: "Novo Beat Bass" },
];

export function CardSection() {
  return (
    <div className="color-bg">
      <section className="containerSectionCard">
        <div className="container-title">Coleções em destaque</div>
        <div className="container-collection">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="collection"
              style={{ backgroundImage: `url(${collection.image})` }}
            >
              <div className="oferta">{collection.offer}</div>
              <h3>{collection.title}</h3>
              <Link to="/products">
                <ButtonCard />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
