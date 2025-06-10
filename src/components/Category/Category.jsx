import { Link } from "react-router-dom";
import Camiseta from "../../assets/tshirt.svg";
import Calca from "../../assets/pants.svg";
import Bone from "../../assets/bone-icon.svg";
import Headphone from "../../assets/headphones.svg";
import Tenis from "../../assets/sneakers.svg";

import "./Category.css";

export function Category() {
  return (
    <>
      <div className="color-bg">
        <section className="color">
          <h2>Coleções em destaque</h2>
          <div className="main">
            <div className="f">
              <picture>
                <Link to="/products">
                  <img src={Camiseta} alt="Camiseta" />
                </Link>
              </picture>
              <p>Camisetas</p>
            </div>
            <div className="f">
              <picture>
                <Link to="/products">
                  <img src={Calca} alt="Calça" />
                </Link>
              </picture>
              <p>Calças</p>
            </div>
            <div className="f">
              <picture>
                <Link to="/products">
                  <img src={Bone} alt="Boné" />
                </Link>
              </picture>
              <p>Bonés</p>
            </div>
            <div className="f">
              <picture>
                <Link to="/products">
                  <img src={Headphone} alt="Headphone" />
                </Link>
              </picture>
              <p>Headphones</p>
            </div>
            <div className="f">
              <picture>
                <Link to="/products">
                  <img src={Tenis} alt="Tênis" />
                </Link>
              </picture>
              <p>Tênis</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Category;
