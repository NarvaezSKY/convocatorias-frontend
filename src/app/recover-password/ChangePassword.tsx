import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { FaEye as EyeIcon, FaEyeSlash as EyeSlashIcon } from "react-icons/fa"
import { Input } from "@heroui/input";
import { Card, CardBody, Spinner, Divider, Form } from "@heroui/react";

import register from "../register";

export const ChangePassword = () => {
    // const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    // const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    // const password = watch("password")

    // const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)
    // const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

    return (
        <DefaultLayout>
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="min-h-screen flex items-center justify-center p-4 border border-gray-200 rounded-lg shadow-lg w-full max-w-md">
                    <div className="w-full max-w-md mb-10">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Recuperar contraseña</h1>
                            <p className="text-gray-600">Ingresa tu correo para recuperar tu contraseña</p>
                        </div>
                        {/* <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mt-4">
                            <CardBody className="p-8">
                                <Form className="space-y-6" onReset={() => reset()} onSubmit={handleSubmit(onSubmit)}>
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
                        </Card> */}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
};