import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    getKeyValue,
  } from "@heroui/react";
  import { useConvocatorias } from "../hooks/UseConvocatorias";
  
  const columns = [
    { key: "convocatoria", label: "Convocatoria" },
    { key: "consecutivo", label: "Consecutivo" },
    { key: "direccion_oficina_regional", label: "Dirección" },
    { key: "tipo_postulacion", label: "Tipo de Postulación" },
    { key: "nuevo_estado", label: "Estado" },
    { key: "nombre", label: "Nombre" },
    { key: "valor", label: "Valor" },
    { key: "fecha_aprobacion", label: "Fecha Aprobación" },
    { key: "fecha_inicio", label: "Fecha Inicio" },
    { key: "fecha_fin", label: "Fecha Fin" },
    { key: "observaciones", label: "Observaciones" },
  ];
  
  export default function ConvocatoriasTable() {
    const { convocatorias, loading, loaderRef, scrollerRef } = useConvocatorias();
  
    return (
      <Table
        isHeaderSticky
        aria-label="Tabla de Convocatorias"
        baseRef={scrollerRef}
        bottomContent={
          <div className="flex w-full justify-center">
            <Spinner ref={loaderRef} color="white" />
          </div>
        }
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[400px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody
          isLoading={loading}
          items={convocatorias}
          loadingContent={<Spinner color="white" />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {getKeyValue(item as { [key: string]: any }, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
  