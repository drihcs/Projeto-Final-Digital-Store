import "./SpecialOffer.css";
import { ButtonRosa } from "../Buttons/Button";
import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import sapato from "../../../public/sapato.png";
import fundo_sapato from "../../../public/fundo_sapato.png";

export function OfertSection() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="container-ofert">
      <div className="image-ofert">
        <img src={sapato} alt="Sapato" className="sapato" />
        <img src={fundo_sapato} alt="Fundo Sapato" className="fundo-sapato" />
      </div>
      <div className="conteudo-ofert">
        <span className="title-ofert">Oferta especial</span>
        <h2>Air Jordan edição de colecionador</h2>
        <p className="lorem-text">
          Esse é o tênis ideal para quem ama estilo, exclusividade e conforto. O Air Jordan edição de colecionador combina design marcante com performance. Aproveite essa chance única de garantir o seu com desconto exclusivo. Oferta válida por tempo limitado ou enquanto durar o estoque.
        </p>
        <NavLink to="/products">
          <ButtonRosa />
        </NavLink>
      </div>
    </div>
  );
}
