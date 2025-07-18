import {
  Form,
  Input,
  Button,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUploadConvocatoria } from "../hooks/UseUploadForm";
import { IUploadConvocatoriaReq } from "../../../core/convocatorias/domain/upload-convocatorias";
import { useEditConvocatorias } from "../hooks/UseEditConvocatorias";

interface Props {
  userId: string;
  method: "upload" | "edit";
  initialValues?: Partial<IUploadConvocatoriaReq>;
  convocatoriaId?: string;
  onClose?: () => void;
}

export function UploadConvocatoriaForm({
  userId,
  method,
  convocatoriaId,
  initialValues,
  onClose,
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
      if (onClose) {
        onClose();
      }
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
      <Select
        isRequired
        label="Convocatoria"
        placeholder="Selecciona una convocatoria"
        variant="bordered"
        {...register("convocatoria", { required: "Este campo es obligatorio" })}
        errorMessage={errors.convocatoria?.message}
        isInvalid={!!errors.convocatoria}
      >
        <SelectItem key="1">1</SelectItem>
        <SelectItem key="2">2</SelectItem>
        <SelectItem key="3">3</SelectItem>
        <SelectItem key="4">4</SelectItem>
      </Select>

      <Input
        isRequired
        label="Consecutivo"
        placeholder="Consecutivo"
        variant="bordered"
        {...register("consecutivo", { required: "Este campo es obligatorio" })}
        errorMessage={errors.consecutivo?.message}
        isInvalid={!!errors.consecutivo}
      />
      <Select
        isRequired
        label="Direccion oficina regional"
        placeholder="Selecciona un centro"
        variant="bordered"
        {...register("direccion_oficina_regional", {
          required: "Este campo es obligatorio",
        })}
        errorMessage={errors.direccion_oficina_regional?.message}
        isInvalid={!!errors.direccion_oficina_regional}
      >
        <SelectItem key="9307 - CENTRO DE COMERCIO Y SERVICIOS">
          9307 - CENTRO DE COMERCIO Y SERVICIOS
        </SelectItem>
        <SelectItem key="9221 - CENTRO DE TELEINFORMATICA Y PRODUCCIÓN INDUSTRIAL">
          9221 - CENTRO DE TELEINFORMATICA Y PRODUCCIÓN INDUSTRIAL
        </SelectItem>
        <SelectItem key="9113 - CENTRO AGROPECUARIO">
          9113 - CENTRO AGROPECUARIO
        </SelectItem>
      </Select>

      <Select
        isRequired
        label="Mecanismo"
        placeholder="Selecciona tipo de proyecto"
        variant="bordered"
        {...register("tipo_postulacion", {
          required: "Este campo es obligatorio",
        })}
        errorMessage={errors.direccion_oficina_regional?.message}
        isInvalid={!!errors.direccion_oficina_regional}
      >
        <SelectItem key="ACTUALIZACION_EQUIPO">
          ACTUALIZACION_EQUIPO
        </SelectItem>
        <SelectItem key="P_METODOLOGIA_GENERAL_AJUSTADA">
          P_METODOLOGIA_GENERAL_AJUSTADA
        </SelectItem>
        <SelectItem key="PLAN DE ACCIÓN">PLAN DE ACCIÓN</SelectItem>
        <SelectItem key="PLANES_OPERATIVO">PLANES_OPERATIVO</SelectItem>
      </Select>

      <Select
        isRequired
        label="Estado"
        placeholder="Selecciona un estado"
        variant="bordered"
        {...register("nuevo_estado", {
          required: "Este campo es obligatorio",
        })}
        errorMessage={errors.nuevo_estado?.message}
        isInvalid={!!errors.nuevo_estado}
      >
        <SelectItem key="Postulaciones en recomendación de continuidad">
          Postulaciones en recomendación de continuidad
        </SelectItem>
        <SelectItem key="Postulaciones en revisión">
          Postulaciones en revisión
        </SelectItem>
        <SelectItem key="Postulaciones en revisión del validador">
          Postulaciones en revisión del validador
        </SelectItem>
        <SelectItem key="Postulaciones con observaciones">
          Postulaciones con observaciones
        </SelectItem>
        <SelectItem key="AVAL REGIONAL">Aval Regional</SelectItem>
        <SelectItem key="En ejecución">En ejecución</SelectItem>
      </Select>

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
        label="Fecha de Aprobación"
        type="date"
        variant="bordered"
        {...register("fecha_aprobacion")}
      />

      <Input
        label="Fecha de Inicio"
        type="date"
        variant="bordered"
        {...register("fecha_inicio")}
      />

      <Input
        label="Fecha de Finalización"
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
        label="URL"
        placeholder="Ej: https://www.ejemplo.com"
        type="url"
        variant="bordered"
        {...register("url")}
      />

      {error && <span className="text-danger text-sm -mt-2">{error}</span>}

      <div className="flex gap-4 w-full">
        <Button color="success" isDisabled={isLoading} type="submit" variant="flat" className="w-full">
          {isLoading
            ? "Cargando..."
            : method === "edit"
              ? "Actualizar"
              : "Subir"}
        </Button>
        <Button type="reset" variant="flat" className="w-full">
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
