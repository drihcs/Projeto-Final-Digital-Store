import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient.js";

export function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session || !data.session.user) {
          setUser(null);
        } else {
          setUser(data.session.user);
        }
      } catch (err) {
        console.error("Erro ao verificar sessão", err);
        setUser(null);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (checking) {
    return <p style={{ padding: "2rem" }}>Verificando login...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
