import DefaultLayout from "@/layouts/default";
import { useAuthStore } from "../shared/auth.store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "@heroui/link";

export const ActivateUser = () => {
    const { token } = useParams();
    const activateUser = useAuthStore((state) => state.activateUser);
    const registerError = useAuthStore((state) => state.registerError);

    useEffect(() => {
        if (token) {
            activateUser(token);
        }
    }, [token, activateUser]);

    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center h-full max-h-xl">
                <h1 className="text-2xl font-bold mb-4">Activar usuario</h1>
                {registerError ? (
                    <p className="text-red-500">{registerError}</p>
                ) : (
                    <p className="text-green-500">El usuario ha sido activado correctamente.</p>
                )}
                <Link href="/home" color="success" className="mt-6">Ir al inicio</Link>
            </div>
        </DefaultLayout>
    );
};
