import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import AppRouter from "./AppRouter";
import AuthProvider from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
}

export default App;
