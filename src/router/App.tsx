import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../app/login";
import { Home } from "@/app/home";
import Register from "@/app/register";
import { useEffect } from "react";
import { useAuthStore } from "@/app/shared/auth.store";
import { NotFound } from "@/layouts/404";

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
            <Home />
          </ProtectedRoute>
        }
        path="/home"
      />
      <Route element={<Login />} path="/" />
      <Route element={<Register />} path="/register" />
      <Route path="*" element={<NotFound />}> </Route>

    </Routes>
  );
}

export default App;
