import { Button, Input, Select, SelectItem, Spinner } from "@heroui/react";
import React from "react";
import { ISearchConvocatoriasReq } from "../../../core/convocatorias/domain/search-convocatorias";
import { CiEraser } from "react-icons/ci";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import { useConvocatorias } from "../hooks/UseConvocatorias";
import { useAuthStore } from "@/app/shared/auth.store";
import { useConvocatoriasStore } from "@/app/shared/convocatorias.store";

interface FiltrosProps {
  filtros: ISearchConvocatoriasReq;
  onChange: (filtro: Partial<ISearchConvocatoriasReq>) => void;
  onReset: () => void;
}

export default function Filtros({ filtros, onChange, onReset }: FiltrosProps) {
  const { user } = useAuthStore();
  const { filterLoading } = useConvocatoriasStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };
  const { generarReporte } = useConvocatorias();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Filtros de búsqueda</h2>
      <form className="mb-4 flex gap-4 flex-wrap items-end">
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <label
            className="text-sm text-neutral-700"
            htmlFor="direccion_oficina_regional"
          >
            Dirección oficina regional
          </label>
          <Select
            fullWidth
            multiple
            id="direccion_oficina_regional"
            label="Dirección oficina regional"
            placeholder="Selecciona un centro"
            size="sm"
            value={filtros.direccion_oficina_regional ?? []}
            variant="bordered"
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
          <label
            className="text-sm text-neutral-700"
            htmlFor="tipo_postulacion"
          >
            Estado
          </label>

          <Select
            fullWidth
            multiple
            id="tipo_postulacion"
            label="Estado"
            placeholder="Selecciona un estado"
            size="sm"
            value={filtros.nuevo_estado ?? []}
            variant="bordered"
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
          <label className="text-sm text-neutral-700" htmlFor="nuevo_estado">
            Mecanismo
          </label>

          <Select
            fullWidth
            multiple
            id="tipo_postulacion"
            label="Mecanismo"
            placeholder="Selecciona un tipo de postulación"
            size="sm"
            value={filtros.tipo_postulacion ?? []}
            variant="bordered"
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
          </Select>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <label className="text-sm text-neutral-700" htmlFor="nombre">
            Convocatoria
          </label>

          <Select
            fullWidth
            multiple
            id="convocatoria"
            label="Convocatoria"
            placeholder="Selecciona una convocatoria"
            size="sm"
            value={filtros.convocatoria ?? []}
            variant="bordered"
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
          <label className="text-sm text-neutral-700" htmlFor="consecutivo">
            Consecutivo
          </label>
          <Input
            id="consecutivo"
            name="consecutivo"
            placeholder="Buscar por consecutivo"
            radius="sm"
            size="lg"
            value={filtros.consecutivo || ""}
            variant="bordered"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-neutral-700" htmlFor="nombre">
            Nombre
          </label>
          <Input
            id="nombre"
            name="nombre"
            placeholder="Buscar por nombre"
            radius="sm"
            size="lg"
            value={filtros.nombre || ""}
            variant="bordered"
            onChange={handleChange}
          />
        </div>

        {user?.role === "superadmin" && (
          <div className="flex flex-col justify-end">
            <Button
              color="success"
              radius="sm"
              size="lg"
              type="button"
              variant="flat"
              onClick={() => generarReporte(filtros)}
            >
              <PiMicrosoftExcelLogoBold className="mr-2" /> Generar reporte
            </Button>
          </div>
        )}

        {user?.role === "admin" && (
          <div className="flex flex-col justify-end">
            <Button
              color="success"
              radius="sm"
              size="lg"
              type="button"
              variant="bordered"
              onClick={() => generarReporte(filtros)}
            >
              <PiMicrosoftExcelLogoBold className="mr-2" /> Generar reporte
            </Button>
          </div>
        )}

        <div className="flex flex-col justify-end">
          <Button
            color="danger"
            radius="sm"
            size="lg"
            type="button"
            variant="flat"
            onClick={onReset}
          >
            <CiEraser className="mr-2" /> Limpiar filtros
          </Button>
        </div>
        {filterLoading && (
          <div className="flex justify-center items-center h-12 rounded-full">
            <Spinner variant="simple" />
          </div>
        )}
      </form>
    </div>
  );
}
