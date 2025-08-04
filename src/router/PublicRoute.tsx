import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/app/shared/auth.store";

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem("token");
  const user = useAuthStore(state => state.user);

  if (token && user) {
    return <Navigate replace to="/home" />;
  }

  return children;
};