import "./Header.css";
import cartIcon from "../../assets/cart-icon.svg";
import Search from "../../assets/Search.svg";
import { Logo } from "../Logo/Logo";
import { NavBar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <div className="heading">
        <Logo />
        <div className="search-container">
          <input type="text" placeholder="Pesquisar produto..." />
          <img className="search-icon" src={Search} alt="Ícone de pesquisa" />
        </div>
        <div>
          <Link to="/register" className="cadastre">Cadastre-se</Link>
          <Link to="/login" className="entrar">Entrar</Link>
          <img className="cart" src={cartIcon} alt="Carrinho de Compras" />
        </div>
      </div>
      <NavBar />
    </header>
  );
}
