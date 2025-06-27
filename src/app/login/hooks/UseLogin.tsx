import { useState } from "react";
import { useAuthStore } from "@/app/shared/auth.store";
import { ILoginReq } from "@/core/auth/domain/login";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { login, loginError, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data: ILoginReq) => {
    setIsLoading(true);
    try {
      await login(data);
      const currentUser = useAuthStore.getState().user;

      if (currentUser) {
        toast.success("Inicio de sesión exitoso");
        navigate("/home", { replace: true });
      } else {
        toast.error("Revisa tus credenciales e intenta nuevamente. Si tu cuenta está inactiva, contacta al administrador del sistema.");
      }
    } catch (e) {
      toast.error("Unexpected error");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login: handleLogin,
    isLoading,
    loginError,
    user,
  };
};
