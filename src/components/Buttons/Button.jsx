import "./ButtonOffer.css";
import "./ButtonSee.css";

export function Button({ children, className }) {
  return (
    <div className={className}>
      <button>{children}</button>
    </div>
  );
}

export function ButtonCard() {
  return <Button className="button-offer">Comprar</Button>;
}

export function ButtonRosa() {
  return <Button className="button-see">Ver Oferta</Button>;
}
