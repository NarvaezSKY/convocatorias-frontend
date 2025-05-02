import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../app/login";
import { Home } from "@/app/home";

function App() {
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
    </Routes>
  );
}

export default App;
