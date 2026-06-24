import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
  Divider,
} from "@heroui/react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useCreateCase } from "../hooks/useCreateCase";
import { useEditCase } from "../hooks/useEditCase";
import { ICreateCaseReq } from "@/core/atencionEspecialJudicial/domain/create-case";
import { IUpdateCaseReq } from "@/core/atencionEspecialJudicial/domain/update-case";
import { ICaseRes } from "@/core/atencionEspecialJudicial/domain/get-all-cases";
import { useEffect, useMemo } from "react";
import { getCitiesByDepartment } from "@/app/home/utils/colombiaLocations";

const estadoOptions = [
  { key: "Por atender", label: "Por atender" },
  { key: "En atención", label: "En atención" },
  { key: "Atendido", label: "Atendido" },
];

const caucaCities = getCitiesByDepartment("Cauca");

interface Props {
  onClose?: () => void;
  method?: "create" | "edit";
  caseId?: string;
  initialValues?: ICaseRes;
}

export function CreateCaseForm({
  onClose,
  method = "create",
  caseId,
  initialValues,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<ICreateCaseReq | IUpdateCaseReq>({
    defaultValues: initialValues
      ? {
          caso_o_sentencia: initialValues.caso_o_sentencia,
          municipios: initialValues.municipios,
          fecha_expedicion_requerimiento:
            initialValues.fecha_expedicion_requerimiento,
          fecha_limite_requerimiento: initialValues.fecha_limite_requerimiento,
          case_estado: initialValues.case_estado,
          case_acciones: initialValues.case_acciones,
        }
      : {
          municipios: [],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "municipios",
  });

  const {
    createCase,
    isLoading: isCreating,
    error: createError,
  } = useCreateCase();
  const {
    updateCase,
    isLoading: isUpdating,
    error: updateError,
  } = useEditCase();

  const selectedMunicipios =
    useWatch({
      control,
      name: "municipios",
      defaultValue: [],
    }) ?? [];

  const selectedNames = useMemo(
    () => selectedMunicipios.map((item: any) => item.municipio).filter(Boolean),
    [selectedMunicipios],
  );

  useEffect(() => {
    if (initialValues?.municipios && fields.length === 0) {
      initialValues.municipios.forEach((m) => {
        append({ municipio: m.municipio, aso_org_terri: m.aso_org_terri });
      });
    }
  }, []);

  useEffect(() => {
    if (initialValues) return;
    const currentNames = new Set(selectedNames);
    const fieldNames = new Set(fields.map((f) => f.municipio));

    const toAdd = caucaCities.filter(
      (city) => currentNames.has(city.nombre) && !fieldNames.has(city.nombre),
    );
    const toRemove = fields.filter(
      (field) => field.municipio && !currentNames.has(field.municipio),
    );

    toAdd.forEach((city) =>
      append({ municipio: city.nombre, aso_org_terri: "" }),
    );
    toRemove.forEach((field) => {
      const idx = fields.findIndex((f) => f.id === field.id);
      if (idx !== -1) remove(idx);
    });
  }, [initialValues, selectedNames, fields, append, remove]);

  const onSubmit = async (data: any) => {
    const municipiosLimpios = (data.municipios ?? []).filter(
      (item: any) =>
        item.municipio?.trim() !== "" && item.aso_org_terri?.trim() !== "",
    );
    if (municipiosLimpios.length === 0) return;

    if (method === "edit" && caseId) {
      await updateCase(caseId, {
        ...data,
        municipios: municipiosLimpios,
      } as IUpdateCaseReq);
    } else {
      await createCase({
        ...data,
        municipios: municipiosLimpios,
      } as ICreateCaseReq);
    }
    reset({ municipios: [] });
    if (onClose) onClose();
  };

  const isLoading = isCreating || isUpdating;
  const error = createError || updateError;

  return (
    <Form
      className="w-full max-w-2xl space-y-4"
      onReset={() =>
        reset(
          initialValues
            ? {
                caso_o_sentencia: initialValues.caso_o_sentencia,
                municipios: initialValues.municipios,
                fecha_expedicion_requerimiento:
                  initialValues.fecha_expedicion_requerimiento,
                fecha_limite_requerimiento:
                  initialValues.fecha_limite_requerimiento,
                case_estado: initialValues.case_estado,
                case_acciones: initialValues.case_acciones,
              }
            : { municipios: [] },
        )
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        isRequired
        label="Caso / Sentencia"
        placeholder="Nombre del caso o sentencia"
        variant="bordered"
        {...register("caso_o_sentencia", {
          required: "Este campo es obligatorio",
          maxLength: { value: 200, message: "Máximo 200 caracteres" },
        })}
        errorMessage={(errors as any).caso_o_sentencia?.message}
        isInvalid={!!(errors as any).caso_o_sentencia}
      />

      <Input
        isRequired
        label="Fecha de expedición del requerimiento"
        type="date"
        variant="bordered"
        {...register("fecha_expedicion_requerimiento", {
          required: "Este campo es obligatorio",
        })}
        errorMessage={(errors as any).fecha_expedicion_requerimiento?.message}
        isInvalid={!!(errors as any).fecha_expedicion_requerimiento}
      />

      <Input
        isRequired
        label="Fecha límite del requerimiento"
        type="date"
        variant="bordered"
        {...register("fecha_limite_requerimiento", {
          required: "Este campo es obligatorio",
        })}
        errorMessage={(errors as any).fecha_limite_requerimiento?.message}
        isInvalid={!!(errors as any).fecha_limite_requerimiento}
      />

      <Select
        isRequired
        label="Estado del caso"
        placeholder="Selecciona un estado"
        variant="bordered"
        {...register("case_estado", { required: "Este campo es obligatorio" })}
        errorMessage={(errors as any).case_estado?.message}
        isInvalid={!!(errors as any).case_estado}
      >
        {estadoOptions.map((opt) => (
          <SelectItem key={opt.key}>{opt.label}</SelectItem>
        ))}
      </Select>

      <Textarea
        isRequired
        label="Acciones del caso"
        placeholder="Describe las acciones del caso"
        variant="bordered"
        maxLength={500}
        {...register("case_acciones", {
          required: "Este campo es obligatorio",
          maxLength: { value: 500, message: "Máximo 500 caracteres" },
        })}
        errorMessage={(errors as any).case_acciones?.message}
        isInvalid={!!(errors as any).case_acciones}
      />

      <Divider />
      <h2 className="font-bold text-success text-xl">Municipios (Cauca)</h2>

      <Controller
        name="municipios"
        control={control}
        render={({ field }) => (
          <Select
            isRequired
            label="Selecciona los municipios"
            placeholder="Municipios del Cauca"
            variant="bordered"
            selectionMode="multiple"
            selectedKeys={new Set(selectedNames)}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys as Set<string>);
              const current = field.value ?? [];
              const nuevos = selected
                .filter(
                  (name) =>
                    !current.some((item: any) => item.municipio === name),
                )
                .map((name) => ({ municipio: name, aso_org_terri: "" }));
              const mantenidos = (current as any[]).filter((item: any) =>
                selected.includes(item.municipio),
              );
              setValue("municipios", [...mantenidos, ...nuevos], {
                shouldDirty: true,
              });
            }}
            errorMessage={
              selectedNames.length === 0
                ? "Selecciona al menos un municipio"
                : undefined
            }
            isInvalid={selectedNames.length === 0}
          >
            {caucaCities.map((city) => (
              <SelectItem key={city.nombre}>{city.nombre}</SelectItem>
            ))}
          </Select>
        )}
      />

      {fields.length > 0 && (
        <div className="space-y-3 w-full">
          <h3 className="font-semibold text-success">
            Asociación, organización o territorio
          </h3>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-default-200 rounded-medium p-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                <Input
                  label="Municipio"
                  variant="bordered"
                  isReadOnly
                  value={field.municipio}
                />
                <Input
                  isRequired
                  label="Asociación, organización o territorio"
                  placeholder="Nombre..."
                  variant="bordered"
                  {...register(`municipios.${index}.aso_org_terri` as const, {
                    required: "Este campo es obligatorio",
                    maxLength: { value: 300, message: "Máximo 300 caracteres" },
                  })}
                  errorMessage={
                    (errors as any).municipios?.[index]?.aso_org_terri?.message
                  }
                  isInvalid={
                    !!(errors as any).municipios?.[index]?.aso_org_terri
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <span className="text-danger text-sm">{error}</span>}

      <div className="flex gap-4 w-full">
        <Button
          color="success"
          isDisabled={isLoading}
          type="submit"
          variant="flat"
          className="w-full"
        >
          {isLoading
            ? "Cargando..."
            : method === "edit"
              ? "Actualizar caso"
              : "Crear caso"}
        </Button>
        <Button type="reset" variant="flat" className="w-full">
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
