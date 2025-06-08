import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../services/supabaseClient.js";

export function SearchPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    async function buscarProdutos() {
      setLoading(true);
      const { data } = await supabase
        .from("produtos")
        .select("*")
        .ilike("nome", `%${query}%`);
      setProdutos(data || []);
      setLoading(false);
    }

    if (query) {
      buscarProdutos();
    }
  }, [query]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Resultados para: "{query}"</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <strong>{produto.nome}</strong> - {produto.descricao}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
