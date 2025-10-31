import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { FaEye as EyeIcon, FaEyeSlash as EyeSlashIcon } from "react-icons/fa"
import { Input } from "@heroui/input";
import { Card, CardBody, Spinner, Divider, Form, CardHeader } from "@heroui/react";
import { IoLockClosed as LockClosedIcon } from "react-icons/io5";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoverPass } from "./hooks/useRecoverPass";

interface FormValues {
    confirmPassword: string
    password: string
}

export const ChangePassword = () => {
    const { isLoading, handleResetPassword } = useRecoverPass()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormValues>()
    const password = watch("password")


    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

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
                            <Form className="space-y-6" onReset={() => reset()} onSubmit={handleSubmit((data) => handleResetPassword(token, data.password))}>
                                <div className="space-y-2 w-full">

                                    <Input
                                        isRequired
                                        label="Contraseña"
                                        autoComplete="new-password"
                                        labelPlacement="outside"
                                        placeholder="Ingresa tu contraseña"
                                        type={isPasswordVisible ? "text" : "password"}
                                        variant="bordered"
                                        startContent={<LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />}
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                                                {isPasswordVisible ? (
                                                    <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                ) : (
                                                    <EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                )}
                                            </button>
                                        }
                                        classNames={{
                                            input: "text-sm",
                                            inputWrapper: "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                                        }}
                                        {...register("password", {
                                            required: "La contraseña es obligatoria",
                                        })}
                                        errorMessage={errors.password?.message}
                                        isInvalid={!!errors.password}
                                    />
                                </div>

                                <div className="space-y-2 w-full">
                                    <Input
                                        isRequired
                                        label="Confirmar contraseña"
                                        labelPlacement="outside"
                                        placeholder="Confirma tu contraseña"
                                        type={isConfirmPasswordVisible ? "text" : "password"}
                                        variant="bordered"
                                        startContent={<LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />}
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility}>
                                                {isConfirmPasswordVisible ? (
                                                    <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                ) : (
                                                    <EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                                )}
                                            </button>
                                        }
                                        classNames={{
                                            input: "text-sm",
                                            inputWrapper: "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                                        }}
                                        {...register("confirmPassword", {
                                            required: "Confirma tu contraseña",
                                            validate: (value) => value === password || "Las contraseñas no coinciden",
                                        })}
                                        errorMessage={errors.confirmPassword?.message}
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                </div>

                                <div className="space-y-2 w-full">
                                    <Button
                                        className="w-full mb-2 h-14 text-success font-semibold"
                                        isDisabled={isLoading}
                                        color="success"
                                        variant="flat"
                                        type="submit"
                                        radius="lg"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <Spinner size="sm" color="white" />
                                                <span>Enviando correo...</span>
                                            </div>
                                        ) : (
                                            "Recuperar contraseña"
                                        )}
                                    </Button>

                                    <Button
                                        type="reset"
                                        variant="flat"
                                        className="w-full h-14 border-gray-200 hover:border-gray-300 transition-colors"
                                        radius="lg"
                                    >
                                        Limpiar campos
                                    </Button>
                                </div>

                                <div className="relative">
                                    <Divider className="my-6" />
                                </div>

                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/* </div> */}
        </DefaultLayout>
    )
};