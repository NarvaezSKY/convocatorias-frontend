"use client";

import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  Divider,
  Spinner,
  Select,
  SelectItem,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { useRegister } from "../hooks/UseRegister";
import type { IRegisterReq } from "@/core/auth/domain/register";
import { IoLockClosed as LockClosedIcon } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { FaEye as EyeIcon, FaEyeSlash as EyeSlashIcon } from "react-icons/fa";
import { FaUserAlt as UserIcon, FaPhoneAlt } from "react-icons/fa";
import { MdEmail as EmailIcon } from "react-icons/md";
import { useState } from "react";

interface FormValues extends IRegisterReq {
  confirmPassword: string;
}

export function RegisterForm() {
  const { registerUser, isLoading, registerError } = useRegister();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data;
    await registerUser(registerData);
  };

  const password = watch("password");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  // const role = watch("role");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 border border-gray-200 rounded-lg shadow-lg w-full max-w-md">
      <div className="w-full max-w-md mb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear cuenta
          </h1>
          <p className="text-gray-600">Regístrate para comenzar</p>
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
                  autoComplete="name"
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                  }}
                  label="Nombre de usuario"
                  labelPlacement="outside"
                  placeholder="Ingresa tu nombre de usuario"
                  startContent={
                    <UserIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                  }
                  variant="bordered"
                  {...register("username", {
                    required: "El nombre de usuario es obligatorio",
                  })}
                  errorMessage={errors.username?.message}
                  isInvalid={!!errors.username}
                />
              </div>

              {/* Campo de email */}
              <div className="space-y-2 w-full">
                <Input
                  isRequired
                  autoComplete="email"
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                  }}
                  label="Correo electrónico"
                  labelPlacement="outside"
                  placeholder="Ingresa tu correo electrónico"
                  startContent={
                    <EmailIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                  }
                  type="email"
                  variant="bordered"
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
              <div className="space-y-2 w-full">
                <Input
                  isClearable
                  isRequired
                  autoComplete="tel"
                  classNames={{
                    input: "text-sm",
                    inputWrapper:
                      "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                  }}
                  label="Número de teléfono"
                  labelPlacement="outside"
                  maxLength={10}
                  placeholder="Ingresa tu número de teléfono"
                  startContent={
                    <FaPhoneAlt className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                  }
                  type="number"
                  variant="bordered"
                  {...register("telefono", {
                    required: "El telefono es obligatorio",
                    pattern: {
                      value: /^\d{10}$/,
                      message:
                        "Número de teléfono inválido, debe tener 10 dígitos",
                    },
                  })}
                  errorMessage={errors.telefono?.message}
                  isInvalid={!!errors.telefono}
                />
              </div>
              <div className="space-y-2 w-full">
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      isRequired
                      errorMessage={errors.role?.message}
                      isInvalid={!!errors.role}
                      label="Rol solicitado"
                      labelPlacement="outside"
                      placeholder="Selecciona tu rol"
                      radius="md"
                      selectedKeys={field.value ? [field.value] : []}
                      size="lg"
                      startContent={
                        <RiAdminFill className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                      }
                      variant="bordered"
                      onSelectionChange={(keys) => {
                        const value = Array.from(keys)[0] as string;
                        field.onChange(value || "");
                      }}
                    >
                      <SelectItem key="" isDisabled>
                        Selecciona tu rol
                      </SelectItem>
                      <SelectItem key="dinamizador">Dinamizador</SelectItem>
                      <SelectItem key="admin">Supervisor</SelectItem>
                      <SelectItem key="investigador">Investigador</SelectItem>
                      <SelectItem key="Linvestigador">Líder Investigador</SelectItem>
                    </Select>
                  )}
                  rules={{ required: "El rol es obligatorio" }}
                />
              </div>
              {/* {(role === "dinamizador" ||
                role === "Linvestigador" ||
                role === "investigador") && (
                <>
                  <Input
                    isRequired
                    classNames={{
                      input: "text-sm",
                      inputWrapper:
                        "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                    }}
                    label="Área de trabajo"
                    labelPlacement="outside"
                    placeholder="Ingresa tu área de trabajo"
                    startContent={
                      <UserIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                    }
                    variant="bordered"
                    {...register("areaDeTrabajo", {
                      required: "El área de trabajo es obligatoria",
                    })}
                    errorMessage={errors.areaDeTrabajo?.message}
                    isInvalid={!!errors.areaDeTrabajo}
                  />
                  <Input
                    isRequired
                    classNames={{
                      input: "text-sm",
                      inputWrapper:
                        "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                    }}
                    label="Clasificación MinCiencias"
                    labelPlacement="outside"
                    placeholder="Ingresa tu clasificación MinCiencias"
                    startContent={
                      <UserIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                    }
                    variant="bordered"
                    {...register("clasificacionMinCiencias", {
                      required: "La clasificación MinCiencias es obligatoria",
                    })}
                    errorMessage={errors.clasificacionMinCiencias?.message}
                    isInvalid={!!errors.clasificacionMinCiencias}
                  />
                  <Input
                    isRequired
                    classNames={{
                      input: "text-sm",
                      inputWrapper:
                        "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                    }}
                    label="CVLAC"
                    labelPlacement="outside"
                    placeholder="Ingresa tu CVLAC"
                    startContent={
                      <UserIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                    }
                    variant="bordered"
                    {...register("CvLAC", {
                      required: "El CVLAC es obligatorio",
                    })}
                    errorMessage={errors.CvLAC?.message}
                    isInvalid={!!errors.CvLAC}
                  />
                  <Input
                    isRequired
                    classNames={{
                      input: "text-sm",
                      inputWrapper:
                        "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
                    }}
                    label="Semillero de investigación"
                    labelPlacement="outside"
                    placeholder="Ingresa tu Semillero de investigación"
                    startContent={
                      <UserIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                    }
                    variant="bordered"
                    {...register("SemilleroInvestigacion", {
                      required: "El Semillero de investigación es obligatorio",
                    })}
                    errorMessage={errors.SemilleroInvestigacion?.message}
                    isInvalid={!!errors.SemilleroInvestigacion}
                  />
                </>
              )} */}

              {/* Campo de contraseña */}
              <div className="space-y-2 w-full">
                <Input
                  isRequired
                  autoComplete="new-password"
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

              {/* Campo de confirmar contraseña */}
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
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  }
                  label="Confirmar contraseña"
                  labelPlacement="outside"
                  placeholder="Confirma tu contraseña"
                  startContent={
                    <LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />
                  }
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  variant="bordered"
                  {...register("confirmPassword", {
                    required: "Confirma tu contraseña",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                  errorMessage={errors.confirmPassword?.message}
                  isInvalid={!!errors.confirmPassword}
                />
              </div>

              {/* Error de registro */}
              {registerError && (
                <div className="border border-danger rounded-lg p-3 w-full">
                  <span className="text-danger text-sm font-medium flex items-center justify-center">
                    {registerError}
                  </span>
                </div>
              )}

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
                      <span>Registrando...</span>
                    </div>
                  ) : (
                    "Crear cuenta"
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

              {/* Enlace de login */}
              <div className="text-center">
                <p className="text-sm text-gray-600 leading-relaxed py-1">
                  ¿Ya tienes una cuenta?{" "}
                  <a
                    className="text-success hover:text-blue-700 font-semibold hover:underline transition-colors"
                    href="/"
                  >
                    Inicia sesión aquí
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
