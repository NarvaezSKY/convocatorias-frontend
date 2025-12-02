import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../app/login";
import { Home } from "@/app/home";
import Register from "@/app/register";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/shared/auth.store";
import { NotFound } from "@/layouts/404";
import { Page } from "../Page";
import { ReporteProyectos } from '../app/reports/index';
import { ActivateUser } from "@/app/admin/ActivateUser";
import { RecoverPassword } from "@/app/recover-password/RecoverPassword";
import { ChangePassword } from "@/app/recover-password/ChangePassword";
import { UserList } from "@/app/users/UserList";
import { useNavigate } from "react-router-dom";
import { Profile } from "@/app/profiles";
import { PublicRoute } from "./PublicRoute";
import { Spinner } from "@heroui/react";

function App() {
  const { verify } = useAuthStore();
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Fallback para evitar pantallas en blanco si la verificación tarda demasiado
    const fallback = setTimeout(() => setCheckingAuth(false), 3000);
    if (token) {
      verify()
        .catch(() => {
          alert("La sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.");
          localStorage.removeItem("token");
          useAuthStore.getState().logout();
          // navigate("/");
        })
        .finally(() => {
          clearTimeout(fallback);
          setCheckingAuth(false);
        });
    } else {
      localStorage.removeItem("token");
      useAuthStore.getState().logout();
      // navigate("/");
      clearTimeout(fallback);
      setCheckingAuth(false);
    }
  }, [verify, navigate]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="success" size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Page title="Proyectos | Innovación y Competitividad">
              <Home />
            </Page>

          </ProtectedRoute>
        }
        path="/home"
      />
      <Route
        element={
          <ProtectedRoute>
            <Page title="Reportes | Innovación y Competitividad">
              <ReporteProyectos />
            </Page>
          </ProtectedRoute>
        }
        path="/reportes/proyectos"
      />
      <Route
        element={
          <PublicRoute>
            <Page title="Iniciar sesión | Innovación y Competitividad">
              <Login />
            </Page>
          </PublicRoute>
        }
        path="/"
      />
      <Route
        element={
          <PublicRoute>
            <Page title="Registrarse | Innovación y Competitividad">
              <Register />
            </Page>
          </PublicRoute>
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

      <Route
        element={
          <ProtectedRoute>
            <Page title="Activar cuenta | Innovación y Competitividad">
              <ActivateUser />
            </Page>
          </ProtectedRoute>


        }
        path="admin/activate/:token" />
      <Route
        element={
          <PublicRoute>
            <Page title="Recuperar contraseña | Innovación y Competitividad">
              <RecoverPassword />
            </Page>
          </PublicRoute>
        }
        path="/recover-password"
      />

      <Route
        element={
          <Page title="Cambiar contraseña | Innovación y Competitividad">
            <ChangePassword />
          </Page>
        }
        path="/reset-password/:token" />

      <Route
        element={
          <ProtectedRoute>
            <Page title="Lista de usuarios | Innovación y Competitividad">
              <UserList />
            </Page>
          </ProtectedRoute>
        }
        path="/users"
      />


      <Route
        element={
          <ProtectedRoute>
            <Page title="Perfil | Innovación y Competitividad">
              <Profile />
            </Page>
          </ProtectedRoute>
        }
        path="/profile/:id"
      />
    </Routes>

  );
}

export default App;
