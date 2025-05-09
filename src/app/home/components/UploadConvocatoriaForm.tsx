import { Form, Input, Button, Textarea } from "@heroui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUploadConvocatoria } from "../hooks/UseUploadForm";
import { IUploadConvocatoriaReq } from "../../../core/convocatorias/domain/upload-convocatorias";
import { useEditConvocatorias } from "../hooks/UseEditConvocatorias";

interface Props {
  userId: string;
  method: "upload" | "edit";
  initialValues?: Partial<IUploadConvocatoriaReq>;
  convocatoriaId?: number;
}

export function UploadConvocatoriaForm({
  userId,
  method,
  convocatoriaId,
  initialValues,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUploadConvocatoriaReq>({
    defaultValues: initialValues,
  });

  const {
    uploadConvocatoria,
    isLoading: isUploading,
    error: uploadError,
  } = useUploadConvocatoria();
  const {
    handlePatchConvocatorias,
    loading: isPatching,
    error: patchError,
  } = useEditConvocatorias();

  const onSubmit = async (data: IUploadConvocatoriaReq) => {
    const payload = { ...data, user_id: userId };

    if (method === "upload") {
      await uploadConvocatoria(payload);
    } else if (method === "edit" && convocatoriaId !== undefined) {
      await handlePatchConvocatorias(convocatoriaId, payload);
    }

    reset();
  };

  useEffect(() => {
    if (initialValues) {
      console.log("initialValues", initialValues);
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const isLoading = isUploading || isPatching;
  const error = uploadError || patchError;

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
        {...register("direccion_oficina_regional", {
          required: "Este campo es obligatorio",
        })}
        errorMessage={errors.direccion_oficina_regional?.message}
        isInvalid={!!errors.direccion_oficina_regional}
      />

      <Input
        isRequired
        label="Tipo de Postulación"
        placeholder="Ej: Interna, Externa"
        variant="bordered"
        {...register("tipo_postulacion", {
          required: "Este campo es obligatorio",
        })}
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
        label="Valor solicitado"
        placeholder="Ej: 10000000"
        variant="bordered"
        {...register("valor_solicitado", {
          required: "Este campo es obligatorio",
        })}
        errorMessage={errors.valor_solicitado?.message}
        isInvalid={!!errors.valor_solicitado}
      />

      <Input
        isRequired
        label="Valor_aprobado"
        placeholder="Ej: 10000000"
        variant="bordered"
        {...register("valor_aprobado", {
          required: "Este campo es obligatorio",
        })}
        errorMessage={errors.valor_aprobado?.message}
        isInvalid={!!errors.valor_aprobado}
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

      <Textarea
        label="Observaciones (opcional)"
        placeholder="Escribe alguna observación"
        variant="bordered"
        {...register("observaciones")}
      />
      <Input
        label="URL (opcional)"
        placeholder="Ej: https://www.ejemplo.com"
        type="url"
        variant="bordered"
        {...register("url")}
      />

      {error && <span className="text-danger text-sm -mt-2">{error}</span>}

      <div className="flex gap-4">
        <Button color="primary" isDisabled={isLoading} type="submit">
          {isLoading
            ? "Cargando..."
            : method === "edit"
              ? "Actualizar"
              : "Subir"}
        </Button>
        <Button type="reset" variant="bordered">
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
