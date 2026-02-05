import { useState } from "react";
import { toast } from "sonner";

import { useAuthStore } from "../../shared/auth.store";

export const useChangePasswordSession = () => {
	const [isLoading, setIsLoading] = useState(false);
	const changePassSession = useAuthStore((state) => state.changePassSession);

	const handleChangePassword = async (currentPassword: string, newPassword: string) => {
		setIsLoading(true);
		try {
			await changePassSession({
				currentPassword,
				newPassword,
			});
			return true;
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message || "Error al cambiar la contraseña");
			} else {
				toast.error("Error al cambiar la contraseña");
			}
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		handleChangePassword,
	};
};

