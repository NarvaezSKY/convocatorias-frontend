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
      const currentError = useAuthStore.getState().registerError;
      if (!currentError) {
        toast.success("Registro exitoso");
        navigate("/home", { replace: true });
      }

      else {
        toast.error("Error al registrarse");
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
