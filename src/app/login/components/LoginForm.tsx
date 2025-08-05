"use client";

import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  Divider,
  Spinner,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/UseLogin";
import type { ILoginReq } from "@/core/auth/domain/login";
import { IoLockClosed as LockClosedIcon } from "react-icons/io5";
import { FaEye as EyeIcon, FaEyeSlash as EyeSlashIcon } from "react-icons/fa";
import { FaUserAlt as UserIcon } from "react-icons/fa";
import { useState } from "react";

export function LoginForm() {
  const { login, isLoading, loginError } = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginReq>();

  const onSubmit = async (data: ILoginReq) => {
    await login(data);
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 border border-gray-200 rounded-lg shadow-lg w-full max-w-md">
      <div className="w-full max-w-md mb-10">
        {/* Header con logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h1>
          <p className="text-gray-600">Iniciar sesión</p>
        </div>

        {/* Card principal */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mt-4">
          <CardBody className="p-8">
            <Form
              className="space-y-6"
              onReset={() => reset()}
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Campo de usuario */}
              <div className="space-y-2 w-full">
                <Input
                  isRequired
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                  }}
                  label="Correo Electrónico"
                  type="email"
                  labelPlacement="outside"
                  placeholder="Ingresa tu correo electrónico"
                  startContent={
                    <UserIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                  }
                  variant="bordered"
                  {...register("email", {
                    required: "El correo electrónico es obligatorio",
                  })}
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                />
              </div>

              {/* Campo de contraseña */}
              <div className="space-y-2 w-full">
                <Input
                  isRequired
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  }
                  label="Contraseña"
                  labelPlacement="outside"
                  placeholder="Ingresa tu contraseña"
                  startContent={
                    <LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                  }
                  type={isPasswordVisible ? "text" : "password"}
                  variant="bordered"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                  })}
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password}
                />
              </div>

              {/* Error de login */}
              {loginError && (
                <div className=" border border-danger  rounded-lg p-3 w-full">
                  <span className="text-danger text-sm font-medium flex items-center justify-center">
                    {loginError}
                  </span>
                </div>
              )}

              {/* Enlace de contraseña olvidada */}
              <div className="text-right text-success font-semibold">
                <a
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors leading-relaxed py-1 inline-block"
                  href="/recover-password"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botones */}
              <div className="space-y-2 w-full">
                <Button
                  className="w-full mb-2 h-14 text-success font-semibold"
                  color="success"
                  isDisabled={isLoading}
                  radius="lg"
                  type="submit"
                  variant="flat"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Spinner color="white" size="sm" />
                      <span>Iniciando sesión...</span>
                    </div>
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>

                <Button
                  className="w-full h-14 border-gray-200 hover:border-gray-300 transition-colors"
                  radius="lg"
                  type="reset"
                  variant="flat"
                >
                  Limpiar campos
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <Divider className="my-6" />
              </div>

              {/* Enlace de registro */}
              <div className="text-center">
                <p className="text-sm text-gray-600 leading-relaxed py-1">
                  ¿No tienes una cuenta?{" "}
                  <a
                    className="text-success hover:text-blue-700 font-semibold hover:underline transition-colors"
                    href="/register"
                  >
                    Regístrate aquí
                  </a>
                </p>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
