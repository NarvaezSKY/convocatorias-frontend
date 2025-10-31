import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, Spinner, Divider, Form, CardHeader } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRecoverPass } from "./hooks/useRecoverPass";
import { MdEmail as EmailIcon } from "react-icons/md"
import React, { useState, useRef } from "react";

interface RecoverPasswordForm {
    email: string;
}

export const RecoverPassword = () => {
    const { handleRecoverPassword, isLoading, registerError } = useRecoverPass();
    const [cooldown, setCooldown] = useState(0);
    const cooldownRef = useRef<NodeJS.Timeout | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RecoverPasswordForm>()

    React.useEffect(() => {
        if (cooldown > 0) {
            cooldownRef.current = setTimeout(() => setCooldown(cooldown - 1), 1000);
        }
        return () => {
            if (cooldownRef.current) clearTimeout(cooldownRef.current);
        };
    }, [cooldown]);

    const onSubmit = async (data: RecoverPasswordForm) => {
        try {
            await handleRecoverPassword(data.email);

            setCooldown(60); // 60 segundos de cooldown
        } catch (error) {
            console.log(error);

            setCooldown(0); // Reinicia cooldown en caso de error
        }
    };

    return (
        <DefaultLayout>
            <div className="flex items-center justify-center p-2">
                {/* <div className=" flex items-center justify-center p-4 border border-gray-200 rounded-lg shadow-lg w-full max-w-md"> */}
                <div className="w-full max-w-md mb-10">

                    <Card className="border-0">
                        <CardHeader className="flex items-center justify-center  mt-6">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray mb-2">Recuperar contraseña</h1>
                                <p className="text-gray-600">Ingresa tu correo para recuperar tu contraseña</p>
                            </div>
                        </CardHeader>
                        <CardBody className="p-8">
                            <Form className="space-y-6" onReset={() => reset()} onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-2 w-full">
                                    <Input
                                        isRequired
                                        label="Correo electrónico"
                                        labelPlacement="outside"
                                        placeholder="Ingresa tu correo electrónico"
                                        type="email"
                                        autoComplete="email"
                                        variant="bordered"
                                        startContent={<EmailIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />}
                                        classNames={{
                                            input: "text-sm",
                                            inputWrapper: "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                                        }}
                                        {...register("email", {
                                            required: "El correo es obligatorio",
                                            pattern: {
                                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                message: "Correo inválido",
                                            },
                                        })}
                                        errorMessage={errors.email?.message}
                                        isInvalid={!!errors.email}
                                    />
                                </div>
                                {registerError && (
                                    <div className=" border border-danger  rounded-lg p-3 w-full">
                                        <span className="text-danger text-sm font-medium flex items-center justify-center">No se encontró tu cuenta. Revisa tu correo e intenta nuevamente</span>
                                    </div>
                                )}

                                <div className="space-y-2 w-full">
                                    <Button
                                        className="w-full mb-2 h-14 text-success font-semibold"
                                        isDisabled={isLoading || cooldown > 0}
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
                                        ) : cooldown > 0 ? (
                                            `Recuperar contraseña (${cooldown}s)`
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

                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/* </div> */}
        </DefaultLayout>
    )
}