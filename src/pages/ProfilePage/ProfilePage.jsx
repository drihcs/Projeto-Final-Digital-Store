import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { NavLink, Outlet } from "react-router-dom";
import "./ProfilePage.css";

export function ProfilePage() {
  return (
    <>
      <Header />
      <div className="profile-container">
        <aside className="sidebar">
          <ul>
            <li className="titulo">Meu Perfil</li>
            <li><NavLink to="meus-pedidos">Meus Pedidos</NavLink></li>
            <li><NavLink to="minhas-informacoes">Minhas Informações</NavLink></li>
            <li><NavLink to="metodos-pagamento">Métodos de Pagamento</NavLink></li>
          </ul>
        </aside>
        <main className="profile-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
