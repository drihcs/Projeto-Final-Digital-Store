import { Link } from "react-router-dom";
import SadShoe from "../../../public/sadShoe.png"
import '../CategoryNotFound/CategoryNotFound.css'

export function CategoryNotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-white text-center p-6">
      <div className="w-70 h-70 mb-6">
        <img src={SadShoe} alt="Imagem de um tênis triste" />
      </div>

      <h1 className="text-6xl font-bold text-[#C92071] mb-[16px]">404</h1>
      <h2 className="text-2xl text-gray-700 mb-[16px]">Página não encontrada</h2>
      <p className="text-gray-500 mb-[12px] max-w-md">
        A aba de Categorias que você está procurando não existe ou foi removida.
        Mas não se preocupe, temos muitos produtos estilosos esperando por você!
      </p>

      <Link
        to="/"
        className="btn-home"
      >
        Voltar para a loja
      </Link>
    </div>
  );
}
