import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <>
        <AppRoutes />
      </>
    </Router>
  );
}

export default App;