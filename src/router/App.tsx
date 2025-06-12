import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../app/login";
import { Home } from "@/app/home";
import Register from "@/app/register";
import { useEffect } from "react";
import { useAuthStore } from "@/app/shared/auth.store";
import { NotFound } from "@/layouts/404";
import { Page } from "../Page";

function App() {
  const { verify } = useAuthStore();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      verify();
    } else {
      sessionStorage.removeItem("token");
    }
  }, [verify]);

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Page title="Home | Innovación y Competitividad">
              <Home />
            </Page>
          </ProtectedRoute>
        }
        path="/home"
      />
      <Route
        element={
          <Page title="Iniciar sesión | Innovación y Competitividad">
            <Login />
          </Page>
        }
        path="/"
      />
      <Route
        element={
          <Page title="Registrarse | Innovación y Competitividad">
            <Register />
          </Page>
        }
        path="/register"
      />
      <Route
        element={
          <Page title="Página no encontrada | Innovación y Competitividad">
            <NotFound />
          </Page>
        }
        path="*"
      />
    </Routes>
  );
}

export default App;
