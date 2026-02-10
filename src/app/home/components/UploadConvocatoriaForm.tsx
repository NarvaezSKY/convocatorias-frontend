/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Autocomplete,
  AutocompleteItem,
  Form,
  Input,
  Button,
  Textarea,
  Select,
  SelectItem,
  Divider,
  Chip,
} from "@heroui/react";
import { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useUploadConvocatoria } from "../hooks/UseUploadForm";
import { IUploadConvocatoriaReq } from "../../../core/convocatorias/domain/upload-convocatorias";
import { useEditConvocatorias } from "../hooks/UseEditConvocatorias";
import { getDepartments, getCitiesByDepartment } from "colombia-cities";
import { poblacionTypes } from "../utils/Poblacion-types";
import { programasFormacion } from "../utils/programasFormacion";

interface Props {
  userId: string;
  method: "upload" | "edit";
  initialValues?: Partial<IUploadConvocatoriaReq>;
  convocatoriaId?: string;
  onClose?: () => void;
}

const yearOptions = [
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
];

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
    control,
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

  const departments = useMemo(() => getDepartments(), []);
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(
    new Set(),
  );
  const [filteredCities, setFilteredCities] = useState<
    Array<{ codigo: string; nombre: string; departamento: string }>
  >([]);
  const [programasInputValue, setProgramasInputValue] = useState("");
  const programasLabelByValue = useMemo(() => {
    const entries = programasFormacion.map(
      (programa) => [programa.value, programa.label] as const,
    );
    return new Map(entries);
  }, []);

  // Actualizar ciudades cuando cambian los departamentos seleccionados
  useEffect(() => {
    if (selectedDepartments.size === 0) {
      setFilteredCities([]);
      return;
    }

    const cities: Array<{
      codigo: string;
      nombre: string;
      departamento: string;
    }> = [];
    selectedDepartments.forEach((deptName) => {
      const dept = departments.find((d) => d.nombre === deptName);
      if (dept) {
        const deptCities = getCitiesByDepartment(dept.nombre);
        deptCities.forEach((city) => {
          cities.push({ ...city, departamento: dept.nombre });
        });
      }
    });
    setFilteredCities(cities);
  }, [selectedDepartments, departments]);

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
      // Inicializar departamentos seleccionados si existen en initialValues
      if (
        initialValues.departamentosDeImpacto &&
        initialValues.departamentosDeImpacto.length > 0
      ) {
        setSelectedDepartments(new Set(initialValues.departamentosDeImpacto));
      }
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
        label="Año"
        placeholder="Selecciona una año"
        variant="bordered"
        {...register("year", { required: "Este campo es obligatorio" })}
        errorMessage={errors.year?.message}
        isInvalid={!!errors.year}
      >
        {yearOptions.map((year) => (
          <SelectItem key={year}>{year}</SelectItem>
        ))}
      </Select>

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
        <SelectItem key="ACTUALIZACION_EQUIPO">ACTUALIZACION_EQUIPO</SelectItem>
        <SelectItem key="P_METODOLOGIA_GENERAL_AJUSTADA">
          P_METODOLOGIA_GENERAL_AJUSTADA
        </SelectItem>
        <SelectItem key="PLAN DE ACCIÓN">PLAN DE ACCIÓN</SelectItem>
        <SelectItem key="PLANES_OPERATIVO">PLANES_OPERATIVO</SelectItem>
        <SelectItem key="INVESTIGACION">INVESTIGACION (MGA)</SelectItem>
        <SelectItem key="MODERNIZACION">MODERNIZACION (MGA)</SelectItem>
        <SelectItem key="PA_LABORATORIO">PA_LABORATORIO</SelectItem>
        <SelectItem key="PA_TECNOACADEMIA">PA_TECNOACADEMIA</SelectItem>
        <SelectItem key="PA_TECNOPARQUE">PA_TECNOPARQUE</SelectItem>
        <SelectItem key="PITTE">PITTE</SelectItem>
        <SelectItem key="NACIONAL">NACIONAL</SelectItem>
        <SelectItem key="REGIONAL">REGIONAL</SelectItem>
        <SelectItem key="PROYECTOS IAP">PROYECTOS IAP</SelectItem>
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

      <Controller
        name="programasRelacionados"
        control={control}
        render={({ field }) => (
          <div className="space-y-2 w-full">
            <Autocomplete
              label="Programas de formacion involucrados"
              placeholder="Busca por nombre del programa"
              fullWidth
              className="w-full"
              variant="bordered"
              size="md"
              radius="md"
              inputValue={programasInputValue}
              onInputChange={setProgramasInputValue}
              onSelectionChange={(key) => {
                const value = key ? String(key) : "";
                const current = Array.isArray(field.value)
                  ? field.value
                  : [];
                if (!value || current.includes(value)) {
                  setProgramasInputValue("");
                  return;
                }

                field.onChange([...current, value]);
                setProgramasInputValue("");
              }}
            >
              {programasFormacion.map((programa) => (
                <AutocompleteItem key={programa.value}>
                  {programa.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            {Array.isArray(field.value) && field.value.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {field.value.map((programa) => (
                  <Chip
                    key={programa}
                    color="primary"
                    size="sm"
                    variant="flat"
                    onClose={() => {
                      const current = Array.isArray(field.value)
                        ? field.value
                        : [];
                      field.onChange(
                        current.filter((item) => item !== programa),
                      );
                    }}
                  >
                    {programasLabelByValue.get(programa) ?? programa}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        )}
      />
      <Divider />
      <h2 className="font-bold text-success text-xl">
        Poblaciones involucradas (opcional)
      </h2>

      <Controller
        name="departamentosDeImpacto"
        control={control}
        render={({ field }) => (
          <Select
            isClearable
            variant="bordered"
            label="Departamentos de impacto"
            placeholder="Selecciona los departamentos involucrados"
            selectionMode="multiple"
            selectedKeys={field.value ? new Set(field.value) : new Set()}
            onSelectionChange={(keys) => {
              const selectedArray = Array.from(keys as Set<string>);
              field.onChange(selectedArray);
              setSelectedDepartments(keys as Set<string>);
            }}
          >
            {departments.map((department) => (
              <SelectItem key={department.nombre} textValue={department.nombre}>
                {department.nombre}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Controller
        name="municipiosDeImpacto"
        control={control}
        render={({ field }) => (
          <Select
            isClearable
            variant="bordered"
            label="Municipios de impacto"
            placeholder={
              selectedDepartments.size === 0
                ? "Primero selecciona departamentos"
                : "Selecciona los municipios involucrados"
            }
            selectionMode="multiple"
            isDisabled={selectedDepartments.size === 0}
            selectedKeys={field.value ? new Set(field.value) : new Set()}
            onSelectionChange={(keys) => {
              const selectedArray = Array.from(keys as Set<string>);
              field.onChange(selectedArray);
            }}
          >
            {filteredCities.map((city) => {
              const displayText = `${city.nombre} (${city.departamento})`;
              return (
                <SelectItem key={displayText} textValue={displayText}>
                  {displayText}
                </SelectItem>
              );
            })}
          </Select>
        )}
      />
      <Controller
        name="tiposPoblacionesAtendidas"
        control={control}
        render={({ field }) => (
          <Select
            label="Tipos de poblaciones atendidas"
            placeholder="Selecciona las poblaciones beneficiadas"
            variant="bordered"
            selectionMode="multiple"
            selectedKeys={field.value ? new Set(field.value) : new Set()}
            onSelectionChange={(keys) => {
              const selectedArray = Array.from(keys as Set<string>);
              field.onChange(selectedArray);
            }}
            errorMessage={errors.tiposPoblacionesAtendidas?.message}
            isInvalid={!!errors.tiposPoblacionesAtendidas}
          >
            {poblacionTypes.map((poblacion) => (
              <SelectItem key={poblacion.name} textValue={poblacion.name}>
                {poblacion.name}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Input
        type="number"
        label="Total de beneficiarios (directos)"
        placeholder="Si se desconoce el dato exacto, digita un aproximado"
        variant="bordered"
        {...register("numeroBeneficiariosDirectos")}
      />

      <Input
        type="number"
        label="Total de beneficiarios (indirectos)"
        placeholder="Si se desconoce el dato exacto, digita un aproximado"
        variant="bordered"
        {...register("numeroBeneficiariosIndirectos")}
      />

      {error && <span className="text-danger text-sm -mt-2">{error}</span>}

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
