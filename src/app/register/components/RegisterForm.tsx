import { Form, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/UseRegister";
import { IRegisterReq } from "@/core/auth/domain/register";
import { Toaster } from "sonner";

interface FormValues extends IRegisterReq {
  confirmPassword: string;
}

export function RegisterForm() {
  const { registerUser, isLoading, registerError } = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const { confirmPassword, ...registerData } = data;
    await registerUser(registerData);
  };

  const password = watch("password");

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      onReset={() => reset()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 rounded-lg p-4">
        <h1 className="text-3xl font-bold mb-2">Registrarse</h1>

        <Input
          isRequired
          label="Nombre de usuario"
          labelPlacement="outside"
          placeholder="Ingresa tu nombre de usuario"
          variant="bordered"
          {...register("username", { required: "El nombre de usuario es obligatorio" })}
          errorMessage={errors.username?.message}
          isInvalid={!!errors.username}
        />

        <Input
          isRequired
          label="Correo electrónico"
          labelPlacement="outside"
          placeholder="Ingresa tu correo"
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

        <Input
          isRequired
          label="Contraseña"
          labelPlacement="outside"
          placeholder="Ingresa tu contraseña"
          type="password"
          variant="bordered"
          {...register("password", { required: "La contraseña es obligatoria" })}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />

        <Input
          isRequired
          label="Verificar contraseña"
          labelPlacement="outside"
          placeholder="Confirma tu contraseña"
          type="password"
          variant="bordered"
          {...register("confirmPassword", {
            required: "Confirma tu contraseña",
            validate: value => value === password || "Las contraseñas no coinciden",
          })}
          errorMessage={errors.confirmPassword?.message}
          isInvalid={!!errors.confirmPassword}
        />

        {registerError && (
          <span className="text-danger text-small -mt-2">{registerError}</span>
        )}

        <div className="flex gap-4">
          <Button
            className="w-full"
            color="primary"
            isDisabled={isLoading}
            type="submit"
            variant="bordered"
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </Button>
          <Button type="reset" variant="bordered">
            Limpiar
          </Button>
        </div>
      </div>
      <Toaster />
    </Form>
  );
}
