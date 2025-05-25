import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const links = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Produtos" },
  { path: "/categorias", label: "Categorias" },
  { path: "/pedidos", label: "Meus Pedidos" },
];

export function NavBar() {
  const location = useLocation();

  return (
    <div className="navbar">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className={
                link.path === "/"
                  ? location.pathname === "/" ? "active" : ""
                  : location.pathname.startsWith(link.path) ? "active" : ""
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
