import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  Chip,
  Input,
  Spinner,
  Tooltip,
} from "@heroui/react";

import { Select, SelectItem } from "@heroui/select";
import React, { useState, useMemo, useEffect } from "react";
import { ISearchConvocatoriasReq } from "../../../core/convocatorias/domain/search-convocatorias";
import { CiEraser } from "react-icons/ci";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import { useConvocatorias } from "../hooks/UseConvocatorias";
import { useAuthStore } from "@/app/shared/auth.store";
import { useConvocatoriasStore } from "@/app/shared/convocatorias.store";
import { getDepartments, getCitiesByDepartment } from 'colombia-cities';
import { poblacionTypes } from '../utils/Poblacion-types';
import { programasFormacion } from "../utils/programasFormacion";

interface FiltrosProps {
  filtros: ISearchConvocatoriasReq;
  onChange: (filtro: Partial<ISearchConvocatoriasReq>) => void;
  onReset: () => void;
  showDownload?: boolean;
}

export default function Filtros({ filtros, onChange, onReset, showDownload }: FiltrosProps) {
  const { user } = useAuthStore();
  const { filterLoading } = useConvocatoriasStore();

  const departments = useMemo(() => getDepartments(), []);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<Array<{ codigo: string; nombre: string; departamento: string }>>([]);
  const [programasInputValue, setProgramasInputValue] = useState("");

  const selectedProgramas = Array.isArray(filtros.programasRelacionados)
    ? filtros.programasRelacionados
    : [];
  const programasLabelByValue = useMemo(() => {
    const entries = programasFormacion.map(
      (programa) => [programa.value, programa.label] as const,
    );
    return new Map(entries);
  }, []);
  const handleRemovePrograma = (programaValue: string) => {
    const nextProgramas = selectedProgramas.filter(
      (programa) => programa !== programaValue,
    );
    onChange({ programasRelacionados: nextProgramas });
  };


  // Actualizar ciudades cuando cambian los departamentos seleccionados
  useEffect(() => {
    if (selectedDepartments.length === 0) {
      setFilteredCities([]);
      return;
    }

    const cities: Array<{ codigo: string; nombre: string; departamento: string }> = [];
    selectedDepartments.forEach(deptName => {
      const dept = departments.find(d => d.nombre === deptName);
      if (dept) {
        const deptCities = getCitiesByDepartment(dept.nombre);
        deptCities.forEach(city => {
          cities.push({ ...city, departamento: dept.nombre });
        });
      }
    });
    setFilteredCities(cities);
  }, [selectedDepartments, departments]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };
  const { generarReporte } = useConvocatorias();

  return (
    <div>
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Filtros de búsqueda</h2>
        <form className="mb-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Select
              fullWidth
              multiple
              id="direccion_oficina_regional"
              label="Dirección oficina regional"
              placeholder="Selecciona un centro"
              size="sm"
              value={filtros.direccion_oficina_regional ?? []}
              variant="bordered"
              isClearable={true}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                onChange({ direccion_oficina_regional: value });
              }}
            >
              <SelectItem key="9307 - CENTRO DE COMERCIO Y SERVICIOS">
                COMERCIO Y SERVICIOS
              </SelectItem>
              <SelectItem key="9221 - CENTRO DE TELEINFORMATICA Y PRODUCCIÓN INDUSTRIAL">
                TELEINFORMATICA Y PRODUCCIÓN INDUSTRIAL
              </SelectItem>
              <SelectItem key="9113 - CENTRO AGROPECUARIO">
                AGROPECUARIO
              </SelectItem>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">

            <Select
              fullWidth
              multiple
              id="tipo_postulacion"
              label="Estado"
              placeholder="Selecciona un estado"
              size="sm"
              value={filtros.nuevo_estado ?? []}
              variant="bordered"
              isClearable={true}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                onChange({ nuevo_estado: value });
              }}
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
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            {/* <label className="text-sm text-neutral-700" htmlFor="nuevo_estado">
              Mecanismo
            </label> */}

            <Select
              fullWidth
              multiple
              id="tipo_postulacion"
              label="Mecanismo"
              placeholder="Selecciona un tipo de postulación"
              size="sm"
              value={filtros.tipo_postulacion ?? []}
              variant="bordered"
              isClearable={true}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                onChange({ tipo_postulacion: value });
              }}
            >
              <SelectItem key="ACTUALIZACION_EQUIPO">
                ACTUALIZACION_EQUIPO
              </SelectItem>
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
          </div>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {/* <label className="text-sm text-neutral-700" htmlFor="Año">
              Año
            </label> */}
            <Select
              placeholder="Año"
              variant="bordered"
              multiple
              size="sm"
              id="tipo_postulacion"
              label="Selecciona un año"
              isClearable={true}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                onChange({ year: value });
              }}>
              <SelectItem key="2015">2015</SelectItem>
              <SelectItem key="2016">2016</SelectItem>
              <SelectItem key="2017">2017</SelectItem>
              <SelectItem key="2018">2018</SelectItem>
              <SelectItem key="2019">2019</SelectItem>
              <SelectItem key="2020">2020</SelectItem>
              <SelectItem key="2021">2021</SelectItem>
              <SelectItem key="2022">2022</SelectItem>
              <SelectItem key="2023">2023</SelectItem>
              <SelectItem key="2024">2024</SelectItem>
              <SelectItem key="2025">2025</SelectItem>
              <SelectItem key="2026">2026</SelectItem>

            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            {/* <label className="text-sm text-neutral-700" htmlFor="nombre">
              Convocatoria
            </label> */}

            <Select
              fullWidth
              multiple
              id="convocatoria"
              label="Convocatoria"
              placeholder="Selecciona una convocatoria"
              size="sm"
              value={filtros.convocatoria ?? []}
              variant="bordered"
              isClearable={true}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                onChange({ convocatoria: value });
              }}
            >
              <SelectItem key="1">1</SelectItem>
              <SelectItem key="2">2</SelectItem>
              <SelectItem key="3">3</SelectItem>
              <SelectItem key="4">4</SelectItem>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            {/* <label className="text-sm text-neutral-700" htmlFor="consecutivo">
              Consecutivo
            </label> */}
            <Input
              id="consecutivo"
              name="consecutivo"
              label="Consecutivo"
              placeholder="Buscar por consecutivo"
              radius="sm"
              size="sm"
              value={filtros.consecutivo || ""}
              variant="bordered"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            {/* <label className="text-sm text-neutral-700" htmlFor="nombre">
              Nombre
            </label> */}
            <Input
              id="nombre"
              name="nombre"
              label="Nombre"
              placeholder="Buscar por nombre"
              radius="sm"
              size="sm"
              value={filtros.nombre || ""}
              variant="bordered"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Select
              fullWidth
              selectionMode="multiple"
              label="Departamentos de impacto"
              placeholder="Selecciona departamentos"
              size="sm"
              value={filtros.departamentosDeImpacto ?? []}
              variant="bordered"
              isClearable={true}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                onChange({ departamentosDeImpacto: value });
                setSelectedDepartments(value ? value.split(',') : []);
              }}
            >
              {departments.map((department) => (
                <SelectItem key={department.nombre}>
                  {department.nombre}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Select
              fullWidth
              selectionMode="multiple"
              label="Municipios de impacto"
              placeholder={selectedDepartments.length === 0 ? "Primero selecciona departamentos" : "Selecciona municipios"}
              size="sm"
              value={filtros.municipiosDeImpacto ?? []}
              variant="bordered"
              isDisabled={selectedDepartments.length === 0}
              isClearable={true}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                onChange({ municipiosDeImpacto: value });
              }}
            >
              {filteredCities.map((city) => {
                const displayText = `${city.nombre} (${city.departamento})`;
                return (
                  <SelectItem key={displayText}>
                    {displayText}
                  </SelectItem>
                );
              })}
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Select
              fullWidth
              selectionMode="multiple"
              label="Tipos de población"
              placeholder="Selecciona tipos de población"
              size="sm"
              value={filtros.tiposPoblacionesAtendidas ?? []}
              variant="bordered"
              isClearable={true}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                onChange({ tiposPoblacionesAtendidas: value });
              }}
            >
              {poblacionTypes.map((poblacion) => (
                <SelectItem key={poblacion.name}>
                  {poblacion.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Autocomplete
              label="Programas de formacion"
              placeholder="Busca por nombre del programa"
              variant="bordered"
              size="sm"
              radius="sm"
              inputValue={programasInputValue}
              onInputChange={setProgramasInputValue}
              onSelectionChange={(key) => {
                const value = key ? String(key) : "";
                if (!value || selectedProgramas.includes(value)) {
                  setProgramasInputValue("");
                  return;
                }

                onChange({
                  programasRelacionados: [...selectedProgramas, value],
                });
                setProgramasInputValue("");
              }}
            >
              {programasFormacion.map((programa) => (
                <AutocompleteItem key={programa.value}>
                  {programa.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            {selectedProgramas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedProgramas.map((programa) => (
                  <Chip
                    key={programa}
                    color="primary"
                    size="sm"
                    variant="flat"
                    onClose={() => handleRemovePrograma(programa)}
                  >
                    {programasLabelByValue.get(programa) ?? programa}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              id="numeroBeneficiariosDirectos"
              name="numeroBeneficiariosDirectos"
              label="Beneficiarios directos"
              placeholder="Número mínimo"
              radius="sm"
              size="sm"
              type="number"
              value={filtros.numeroBeneficiariosDirectos || ""}
              variant="bordered"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Input
              id="numeroBeneficiariosIndirectos"
              name="numeroBeneficiariosIndirectos"
              label="Beneficiarios indirectos"
              placeholder="Número mínimo"
              radius="sm"
              size="sm"
              type="number"
              value={filtros.numeroBeneficiariosIndirectos || ""}
              variant="bordered"
              onChange={handleChange}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-2 mb-1">

            {user?.role === "superadmin" && showDownload && (
              <div className="flex flex-col justify-end">
                <Tooltip content="Generar reporte">
                  <Button
                    className="w-full"
                    color="success"
                    radius="sm"
                    size="lg"
                    type="button"
                    variant="flat"
                    onClick={() => generarReporte(filtros)}
                  >
                    <PiMicrosoftExcelLogoBold className="w-7 h-7" />
                  </Button>
                </Tooltip>
              </div>
            )}

            <div className="flex flex-col justify-end">
              <Tooltip content="Limpiar filtros">
                <Button
                  className="w-full"
                  color="danger"
                  radius="sm"
                  size="lg"
                  type="button"
                  variant="flat"
                  onClick={onReset}
                >
                  <CiEraser className="w-7 h-7" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </form>
      </Card>
      {filterLoading && (
        <div className="flex justify-center mt-4 items-center h-12 rounded-full w-full">
          <Spinner variant="simple" color="success" />
          <span className="ml-2 text-success">Solo un momento...</span>
        </div>
      )}
    </div>
  );
}
