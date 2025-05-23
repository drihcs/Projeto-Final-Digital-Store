import Camiseta from "../../assets/tshirt.svg";
import Calca from "../../assets/pants.svg";
import Bone from "../../assets/bone-icon.svg";
import Headphone from "../../assets/headphones.svg";
import Tenis from "../../assets/sneakers.svg";

import "./Category.css";

export function Section() {
  return (
    <>
      <div className="color-bg">
        <section className="color">
          <h2>Coleções em destaque</h2>
          <div className="main">
            <div className="f">
              <picture>
                <img src={Camiseta} alt="Camiseta" />
              </picture>
              <p>Camisetas</p>
            </div>
            <div className="f">
              <picture>
                <img src={Calca} alt="Calça" />
              </picture>
              <p>Calças</p>
            </div>
            <div className="f">
              <picture>
                <img src={Bone} alt="Boné" />
              </picture>
              <p>Bonés</p>
            </div>
            <div className="f">
              <picture>
                <img src={Headphone} alt="Headphone" />
              </picture>
              <p>Headphones</p>
            </div>
            <div className="f">
              <picture>
                <img src={Tenis} alt="Tênis" />
              </picture>
              <p>Tênis</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Section;
