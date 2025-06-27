import { useAuthStore } from "@/app/shared/auth.store";
import { useState } from "react";
import { toast } from "sonner";

export const useRecoverPass = () => {
  const { recoverPassword, registerError, changePassword } = useAuthStore();
  const [isLoading, setLoading] = useState(false);

  const handleRecoverPassword = async (email: string) => {
    try {
      setLoading(true);
      await recoverPassword(email);
      toast.success("Se ha enviado un correo electrónico para recuperar tu contraseña.");
    } catch (error) {
      toast.error("No se encontró tu cuenta. Revisa tu correo e intenta nuevamente.");
      console.error("Error recovering password:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (token: string, password: string) => {
    try {
      setLoading(true);
      await changePassword({ token: token, newPassword: password });
      toast.success("Su contraseña ha sido cambiada exitosamente.");
      setLoading(false);
    } catch (error) {
      console.error("Error recovering password:", error);
      setLoading(false);
    }
  };

  return {
    handleResetPassword,
    isLoading,
    handleRecoverPassword,
    registerError,
  };
}