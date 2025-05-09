import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
  Button,
} from "@heroui/react";
import { useConvocatorias } from "../hooks/UseConvocatorias";
import { useAuthStore } from "@/app/shared/auth.store";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { UploadConvocatoriaForm } from "./UploadConvocatoriaForm";
import { IUploadConvocatoriaReq } from "@/core/convocatorias/domain/upload-convocatorias";
import { useState } from "react";

const columns = [
  { key: "convocatoria", label: "Convocatoria" },
  { key: "consecutivo", label: "Consecutivo" },
  { key: "direccion_oficina_regional", label: "Dirección" },
  { key: "tipo_postulacion", label: "Mecanismo" },
  { key: "nuevo_estado", label: "Estado" },
  { key: "nombre", label: "Nombre" },
  { key: "valor_solicitado", label: "Valor Solicitado" },
  { key: "valor_aprobado", label: "Valor Aprobado" },
  { key: "diferencia_presupuesto", label: "Diferencia Presupuesto" },
  { key: "fecha_aprobacion", label: "Fecha Aprobación" },
  { key: "fecha_inicio", label: "Fecha Inicio" },
  { key: "fecha_fin", label: "Fecha Fin" },
  { key: "observaciones", label: "Observaciones" },
  { key: "url", label: "URL" },
  { key: "acciones", label: "Acciones" },
];

export default function ConvocatoriasTable() {
  const [editingConvocatoria, setEditingConvocatoria] = useState<IUploadConvocatoriaReq | null>(null);

  const {
    convocatorias,
    loaderRef,
    scrollerRef,
    handleDelete,
  } = useConvocatorias();
  const { user } = useAuthStore();

  return (
    <>
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
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            <TableRow>
              <TableCell colSpan={columns.length}>
                <div className="text-center py-4 text-neutral-400">
                  No se encontraron convocatorias
                </div>
              </TableCell>
            </TableRow>
          }
          isLoading={false}
          items={convocatorias}
          loadingContent={<Spinner color="white" />}
        >
          {(item) => (
            <TableRow key={item.id} className="hover:bg-white">
              {(columnKey) => (
                <TableCell>
                  {columnKey === "acciones" &&
                    user &&
                    user.role === "superadmin" ? (
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        color="warning"
                        radius="full"
                        size="md"
                        variant="bordered"
                        onClick={() => setEditingConvocatoria(item as unknown as IUploadConvocatoriaReq)}
                      >
                        <FaEdit className="text-neutral-200" />
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        radius="full"
                        size="md"
                        variant="bordered"
                        onClick={() => handleDelete(item.id)}
                      >
                        <RiDeleteBin2Line className="text-neutral-200" />
                      </Button>
                    </div>
                  ) : (
                    getKeyValue(item as { [key: string]: any }, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {user && user.role === "superadmin" && editingConvocatoria && (
        <div className="flex justify-end mt-4">
          <UploadConvocatoriaForm
            userId={user.userid}
            method="edit"
            initialValues={editingConvocatoria}
          />
        </div>
      )}


    </>
  );
}
