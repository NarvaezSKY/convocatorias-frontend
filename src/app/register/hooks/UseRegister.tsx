import { useState } from "react";
import { useAuthStore } from "@/app/shared/auth.store";
import { IRegisterReq } from "@/core/auth/domain/register";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { register, registerError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (data: IRegisterReq) => {
    setIsLoading(true);
    try {
      await register(data);
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        toast.success("Registro exitoso");
        navigate("/home", { replace: true });
      }
    } catch (e) {
      toast.error("Ocurrió un error al registrarse");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerUser,
    isLoading,
    registerError,
  };
};
