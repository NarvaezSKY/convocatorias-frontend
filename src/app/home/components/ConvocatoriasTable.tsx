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
  Pagination,
} from "@heroui/react";
import { useConvocatorias } from "../hooks/UseConvocatorias";
import { useAuthStore } from "@/app/shared/auth.store";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { UploadConvocatoriaForm } from "./UploadConvocatoriaForm";
import { IUploadConvocatoriaReq } from "@/core/convocatorias/domain/upload-convocatorias";
import { useState, useMemo } from "react";
import ReusableModal from "@/app/shared/components/Modal";
import { useConvocatoriasStore } from "@/app/shared/convocatorias.store";

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

const rowsPerPage = 5;

export default function ConvocatoriasTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { convocatorias, handleDelete } = useConvocatorias();
  const { user } = useAuthStore();
  const { getSingleConvocatoria, singleConvocatoria } = useConvocatoriasStore();

  const handleEdit = async (id: number) => {
    await getSingleConvocatoria(id);
    setIsOpen(true);
  };

  const pages = useMemo(() => {
    return convocatorias?.length
      ? Math.ceil(convocatorias.length / rowsPerPage)
      : 0;
  }, [convocatorias]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return convocatorias.slice(start, start + rowsPerPage);
  }, [page, convocatorias]);

  return (
    <>
      <Table
        aria-label="Tabla de Convocatorias con paginación"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        classNames={{
          table: "min-h-[400px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encontraron convocatorias"}
          items={paginatedData}
          loadingContent={<Spinner color="white" />}
          loadingState={convocatorias.length === 0 ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "acciones" && user?.role === "superadmin" ? (
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        color="warning"
                        radius="full"
                        size="md"
                        variant="bordered"
                        onClick={() => handleEdit(item.id)}
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
                  ) : columnKey === "url" ? (
                    <a
                      className="text-primary underline"
                      href={getKeyValue(
                        item as { [key: string]: any },
                        columnKey
                      )}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {getKeyValue(item as { [key: string]: any }, columnKey)}
                    </a>
                  ) : (
                    getKeyValue(item as { [key: string]: any }, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {user?.role === "superadmin" && singleConvocatoria && (
        <ReusableModal
          isOpen={isOpen}
          modalTitle="Editar Convocatoria"
          onClose={() => setIsOpen(false)}
          onSubmit={() => setIsOpen(false)}
        >
          <div className="flex justify-end mt-4">
            <UploadConvocatoriaForm
              convocatoriaId={singleConvocatoria.id}
              initialValues={
                singleConvocatoria as unknown as IUploadConvocatoriaReq
              }
              method="edit"
              userId={user.userid}
            />
          </div>
        </ReusableModal>
      )}
    </>
  );
}
