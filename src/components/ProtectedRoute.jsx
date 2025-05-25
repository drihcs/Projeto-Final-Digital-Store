import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Erro ao buscar sessão:", error.message);
      }
      setUser(session?.user || null);
      setLoading(false);
    }

    checkUser();
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Carregando...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
