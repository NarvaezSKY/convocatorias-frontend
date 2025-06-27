import { useAuthStore } from "@/app/shared/auth.store";
import { useState } from "react";
import { toast } from "sonner";

export const useRecoverPass = () => {
  const { recoverPassword, registerError } = useAuthStore();
  const [isLoading, setLoading] = useState(false);

  const handleRecoverPassword = async (email: string) => {
    try {
      setLoading(true);
      await recoverPassword(email);
      toast.success("Se ha enviado un enlace de recuperación a tu correo electrónico.");
      setLoading(false);
    } catch (error) {
      toast.error("Tu correo electrónico no está registrado.");
      console.error("Error recovering password:", error);
      setLoading(false);
    }
  };

  return {
    isLoading,
    handleRecoverPassword,
    registerError,
  };
}