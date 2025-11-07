import DefaultLayout from "./default";
import { Button, Card, CardBody } from "@heroui/react";
import { FaHome, FaSearch } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

export const NotFound = () => {
    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <Card className="max-w-2xl w-full shadow-2xl border-2 border-danger-200">
                    <CardBody className="text-center p-12">
                        {/* Icono animado */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <MdError className="text-9xl text-danger animate-pulse" />
                                <div className="absolute -top-2 -right-2 bg-warning text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-bounce">
                                    !
                                </div>
                            </div>
                        </div>

                        {/* Título principal */}
                        <div className="mb-6">
                            <h1 className="text-8xl font-black text-gradient bg-success bg-clip-text text-transparent mb-2">
                                404
                            </h1>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                                ¡Oops! Página no encontrada
                            </h2>
                        </div>

                        {/* Descripción */}
                        <div className="mb-8">
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                                Lo sentimos, la página que estás buscando no existe o ha sido movida.
                            </p>
                            <p className="text-base text-gray-500 dark:text-gray-500">
                                Puede que hayas escrito mal la URL o que el enlace esté desactualizado.
                            </p>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                color="success"
                                size="lg"
                                startContent={<FaHome />}
                                className="w-full sm:w-auto font-semibold text-white"
                                as="a"
                                href="/home"
                            >
                                Ir al Inicio
                            </Button>
                            <Button
                                color="success"
                                variant="bordered"
                                size="lg"
                                startContent={<BiArrowBack />}
                                className="w-full sm:w-auto font-semibold"
                                onClick={() => window.history.back()}
                            >
                                Volver Atrás
                            </Button>
                        </div>

                        {/* Sugerencias adicionales */}
                        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center justify-center gap-2">
                                <FaSearch className="text-primary" />
                                ¿Qué puedes hacer?
                            </h3>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                <li>• Verificar que la URL esté escrita correctamente</li>
                                <li>• Usar el menú de navegación para encontrar lo que buscas</li>
                                <li>• Contactar al administrador si crees que es un error</li>
                            </ul>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </DefaultLayout>
    );
}