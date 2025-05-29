import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/HomePage/HomePage.jsx";
import { ProductListingPage } from "../pages/ProductListingPage/ProductListingPage";
import { ProductViewPage } from "../pages/ProductViewPage/ProductViewPage";
import { CategoryNotFound } from "../pages/CategoryNotFound/CategoryNotFound";
import { LoginPage } from "../pages/LoginPage/LoginPage.jsx";
import { CreateAccountPage } from "../pages/CreateAccountPage/CreateAccountPage.jsx";

import { ProfilePage } from "../pages/ProfilePage/ProfilePage.jsx";
import MeusPedidos from "../pages/ProfilePage/MeusPedidos.jsx";
import MinhasInformacoes from "../pages/ProfilePage/MinhasInformacoes.jsx";
import MetodosPagamento from "../pages/ProfilePage/MetodosPagamento.jsx";

import CarrinhoPage from "../pages/CarrinhoPage/CarrinhoPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import SucessoPage from '../pages/SucessoPage/SucessoPage';

import { ProtectedRoute } from "../components/ProtectedRoute.jsx";

export function AppRoutes() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/viewProduct" element={<ProductViewPage />} />
            <Route path="/categorias" element={<CategoryNotFound />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<CreateAccountPage />} />
            <Route path="/meu-carrinho" element={<CarrinhoPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/sucesso" element={<SucessoPage />} />

            {/* Rota protegida: /pedidos + sub-abas */}
            <Route
                path="/pedidos"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            >
                <Route path="meus-pedidos" element={<MeusPedidos />} />
                <Route path="minhas-informacoes" element={<MinhasInformacoes />} />
                <Route path="metodos-pagamento" element={<MetodosPagamento />} />
            </Route>
        </Routes>
    );
}
