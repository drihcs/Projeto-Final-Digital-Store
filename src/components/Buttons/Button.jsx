import "./ButtonOffer.css";
import "./ButtonSee.css";

export function Button({ children, className }) {
  return (
    <div className={className}>
      <button>{children}</button>
    </div>
  );
}

export function ButtonOffer() {
  return <Button className="button-offer">Comprar</Button>;
}

export function ButtonSee() {
  return <Button className="button-see">Ver Oferta</Button>;
}
