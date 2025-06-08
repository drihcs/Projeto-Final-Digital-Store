import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ScrollToTop } from "./components/ScrollToTop";
import { supabase } from "./services/supabaseClient";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) {
        console.log("Usuário logado:", data.session.user);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        console.log("Mudança de login:", session.user);
      }
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}

export default App;
