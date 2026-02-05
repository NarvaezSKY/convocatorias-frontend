import DefaultLayout from "@/layouts/default";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { ChangePasswordForm } from "./components/ChangePasswordForm";

export const ChangePassword = () => {
    const token = window.location.pathname.split("/").pop();
    console.log("Token de recuperación:", token)
    if (!token) {
        return (
            <DefaultLayout>
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray mb-4">Token no válido</h1>
                        <p className="text-gray-600">El token de recuperación de contraseña es inválido o ha expirado.</p>
                    </div>
                </div>
            </DefaultLayout>
        )
    }

    return (
        <DefaultLayout>
            <div className="flex items-center justify-center p-4">
                {/* <div className="min-h-screen flex items-center justify-center p-4 border border-gray-200 rounded-lg shadow-lg w-full max-w-md"> */}
                <div className="w-full max-w-md">

                    <Card className=" border-0 mt-4">
                        <CardHeader className="flex justify-center mt-6">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray mb-2">Cambiar contraseña</h1>
                                <p className="text-gray-600">Ingresa tu nueva contraseña. ¡No la olvides de nuevo!</p>
                            </div>
                        </CardHeader>
                        <CardBody className="p-8">
                            <ChangePasswordForm token={token} />
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/* </div> */}
        </DefaultLayout>
    )
};