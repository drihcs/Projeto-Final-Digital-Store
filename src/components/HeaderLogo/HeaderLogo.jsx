import "./HeaderLogo.css";
import { Link } from 'react-router-dom';
import { Logo } from "../Logo/Logo";

export function Header2() {
  return (
    <header className="header-logo">
      <div className="heading-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
}