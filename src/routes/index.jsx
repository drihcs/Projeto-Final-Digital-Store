import { Routes, Route } from "react-router-dom"
import { HomePage } from '../pages/HomePage/HomePage'
import { ProductListingPage } from '../pages/ProductListingPage/ProductListingPage'
import { ProductViewPage } from '../pages/ProductViewPage/ProductViewPage'
import { CreateAccountPage } from '../pages/CreateAccountPage/CreateAccountPage';
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { CategoryNotFound } from "../pages/CategoryNotFound/CategoryNotFound"
import { MeusPedidosPage } from "../pages/MeusPedidosPage/MeusPedidosPage";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pedidos" element={<MeusPedidosPage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/viewProduct" element={<ProductViewPage />} />
            <Route path="/register" element={<CreateAccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/categorias" element={<CategoryNotFound />} />
        </Routes>
    )
}

