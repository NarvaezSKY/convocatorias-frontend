import { Form, Input, Button, Textarea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useUploadConvocatoria } from "../hooks/UseUploadForm";
import { Toaster } from "sonner";
import { IUploadConvocatoriaReq } from '../../../core/convocatorias/domain/upload-convocatorias/upload-convocatoria.req';

export function UploadConvocatoriaForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUploadConvocatoriaReq>();

  const { uploadConvocatoria, isLoading, error } = useUploadConvocatoria();

  const onSubmit = async (data: IUploadConvocatoriaReq) => {
    await uploadConvocatoria({ ...data, user_id: userId });
    reset();
  };

  return (
    <Form
      className="w-full max-w-2xl space-y-4"
      onReset={() => reset()}
      onSubmit={handleSubmit(onSubmit)}
    >

      <Input
        isRequired
        label="Convocatoria"
        placeholder="Nombre de la convocatoria"
        variant="bordered"
        {...register("convocatoria", { required: "Este campo es obligatorio" })}
        errorMessage={errors.convocatoria?.message}
        isInvalid={!!errors.convocatoria}
        type="number"
      />

      <Input
        isRequired
        label="Consecutivo"
        placeholder="Consecutivo"
        variant="bordered"
        {...register("consecutivo", { required: "Este campo es obligatorio" })}
        errorMessage={errors.consecutivo?.message}
        isInvalid={!!errors.consecutivo}
      />

      <Input
        isRequired
        label="Dirección Oficina Regional"
        placeholder="Ej: Dirección General"
        variant="bordered"
        {...register("direccion_oficina_regional", { required: "Este campo es obligatorio" })}
        errorMessage={errors.direccion_oficina_regional?.message}
        isInvalid={!!errors.direccion_oficina_regional}
      />

      <Input
        isRequired
        label="Tipo de Postulación"
        placeholder="Ej: Interna, Externa"
        variant="bordered"
        {...register("tipo_postulacion", { required: "Este campo es obligatorio" })}
        errorMessage={errors.tipo_postulacion?.message}
        isInvalid={!!errors.tipo_postulacion}
      />

      <Input
        label="Estado (opcional)"
        placeholder="Nuevo estado"
        variant="bordered"
        {...register("nuevo_estado")}
      />

      <Input
        isRequired
        label="Nombre"
        placeholder="Nombre del proyecto o propuesta"
        variant="bordered"
        {...register("nombre", { required: "Este campo es obligatorio" })}
        errorMessage={errors.nombre?.message}
        isInvalid={!!errors.nombre}
      />

      <Input
        isRequired
        label="Valor"
        placeholder="Ej: 10000000"
        variant="bordered"
        {...register("valor", { required: "Este campo es obligatorio" })}
        errorMessage={errors.valor?.message}
        isInvalid={!!errors.valor}
      />

      <Input
        label="Fecha de Aprobación (opcional)"
        type="date"
        variant="bordered"
        {...register("fecha_aprobacion")}
      />

      <Input
        label="Fecha de Inicio (opcional)"
        type="date"
        variant="bordered"
        {...register("fecha_inicio")}
      />

      <Input
        label="Fecha de Finalización (opcional)"
        type="date"
        variant="bordered"
        {...register("fecha_fin")}
      />

      {/* <Textarea
      //   label="Observaciones (opcional)"
      //   placeholder="Escribe alguna observación"
      //   variant="bordered"
      //   {...register("observaciones")}
      // /> */}

      <Textarea
        label="Observaciones (opcional)"
        placeholder="Escribe alguna observación"
        variant="bordered"
        {...register("observaciones")}
      />
      {error && <span className="text-danger text-sm -mt-2">{error}</span>}

      <div className="flex gap-4">
        <Button color="primary" isDisabled={isLoading} type="submit" >
          {isLoading ? "Cargando..." : "Subir"}
        </Button>
        <Button type="reset" variant="bordered">
          Limpiar
        </Button>
      </div>

      <Toaster />
    </Form>
  );
}
