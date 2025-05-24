import { Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import MeusPedidos from "../pages/ProfilePage/MeusPedidos.jsx";
import MinhasInformacoes from "../pages/ProfilePage/MinhasInformacoes.jsx";
import MetodosPagamento from "../pages/ProfilePage/MetodosPagamento.jsx";
import { HomePage } from '../pages/HomePage/HomePage'
import { ProductListingPage } from '../pages/ProductListingPage/ProductListingPage'
import { ProductViewPage } from '../pages/ProductViewPage/ProductViewPage'
import { CreateAccountPage } from '../pages/CreateAccountPage/CreateAccountPage';
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { CategoryNotFound } from "../pages/CategoryNotFound/CategoryNotFound"

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/viewProduct" element={<ProductViewPage />} />
            <Route path="/register" element={<CreateAccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/categorias" element={<CategoryNotFound />} />
            <Route path="/pedidos" element={<ProfilePage />}>
                <Route path="meus-pedidos" element={<MeusPedidos />} />
                <Route path="minhas-informacoes" element={<MinhasInformacoes />} />
                <Route path="metodos-pagamento" element={<MetodosPagamento />} />
            </Route>
        </Routes>
    )
}
