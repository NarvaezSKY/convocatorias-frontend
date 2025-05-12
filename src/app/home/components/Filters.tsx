import { Button, Input } from "@heroui/react";
import React from "react";
import { ISearchConvocatoriasReq } from "../../../core/convocatorias/domain/search-convocatorias";
import { CiEraser } from "react-icons/ci";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import { useConvocatorias } from "../hooks/UseConvocatorias";

interface FiltrosProps {
  filtros: ISearchConvocatoriasReq;
  onChange: (filtro: Partial<ISearchConvocatoriasReq>) => void;
  onReset: () => void;
}

export default function Filtros({ filtros, onChange, onReset }: FiltrosProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };
  const { generarReporte } = useConvocatorias();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Filtros de búsqueda</h2>
      <form className="mb-4 flex gap-4 flex-wrap items-end">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-neutral-700" htmlFor="nombre">
            Convocatoria
          </label>
          <Input
            id="convocatoria"
            name="convocatoria"
            placeholder="ej. 1"
            size="sm"
            type="number"
            value={filtros.convocatoria || ""}
            variant="bordered"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-neutral-700" htmlFor="consecutivo">
            Consecutivo
          </label>
          <Input
            id="consecutivo"
            name="consecutivo"
            placeholder="Buscar por consecutivo"
            size="sm"
            value={filtros.consecutivo || ""}
            variant="bordered"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm text-neutral-700"
            htmlFor="tipo_postulacion"
          >
            Tipo de Postulación
          </label>
          <Input
            id="tipo_postulacion"
            name="tipo_postulacion"
            placeholder="Tipo de Postulación"
            size="sm"
            value={filtros.tipo_postulacion || ""}
            variant="bordered"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-neutral-700" htmlFor="nuevo_estado">
            Estado
          </label>
          <Input
            id="nuevo_estado"
            name="nuevo_estado"
            placeholder="Estado"
            size="sm"
            value={filtros.nuevo_estado || ""}
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
            size="sm"
            value={filtros.nombre || ""}
            variant="bordered"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col justify-end">
          <Button
            color="success"
            radius="sm"
            size="sm"
            type="button"
            variant="bordered"
            onClick={() => generarReporte(filtros)}
          >
            <PiMicrosoftExcelLogoBold className="mr-2" /> Generar reporte
          </Button>
        </div>
        <div className="flex flex-col justify-end">
          <Button
            color="danger"
            radius="sm"
            size="sm"
            type="button"
            variant="bordered"
            onClick={onReset}
          >
            <CiEraser className="mr-2" /> Limpiar filtros
          </Button>
        </div>
      </form>
    </div>
  );
}
