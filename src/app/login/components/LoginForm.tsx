import { Form, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/UseLogin";
import { ILoginReq } from "@/core/auth/domain/login";
import { Toaster } from "sonner";

export function LoginForm() {
  const { login, isLoading, loginError } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginReq>();

  const onSubmit = async (data: ILoginReq) => {
    await login(data);
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      onReset={() => reset()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 rounded-lg p-4">
        <h1 className="text-3xl font-bold mb-2">Iniciar Sesión</h1>

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
          label="Contraseña"
          labelPlacement="outside"
          placeholder="Ingresa tu contraseña"
          type="password"
          variant="bordered"
          {...register("password", { required: "La contraseña es obligatoria" })}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />

        {loginError && (
          <span className="text-danger text-small -mt-2">{loginError}</span>
        )}

        <div className="flex gap-4">
          <Button
            className="w-full"
            color="primary"
            isDisabled={isLoading}
            type="submit"
            variant="bordered"
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
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
