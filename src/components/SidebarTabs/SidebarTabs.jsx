import { NavLink } from "react-router-dom";
import "./SidebarTabs.css";

export function SidebarTabs() {
  return (
    <aside style={{ width: "220px", padding: "2rem", borderRight: "1px solid #ccc" }}>
      <h3>Meu Perfil</h3>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
        <NavLink
          to="meus-pedidos"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Meus Pedidos
        </NavLink>
        <NavLink
          to="minhas-informacoes"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Minhas Informações
        </NavLink>
        <NavLink
          to="metodos-pagamento"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Métodos de Pagamento
        </NavLink>
      </nav>
    </aside>
  );
}
