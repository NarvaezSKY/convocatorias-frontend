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
  Card,
  CardBody,
  CardHeader,
  Tooltip,
} from "@heroui/react";
import { useConvocatorias } from "../hooks/UseConvocatorias";
import { useAuthStore } from "@/app/shared/auth.store";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { UploadConvocatoriaForm } from "./UploadConvocatoriaForm";
import { IUploadConvocatoriaReq } from "@/core/convocatorias/domain/upload-convocatorias";
import { useState, useMemo, useEffect } from "react";
import ReusableModal from "@/app/shared/components/Modal";
import { useConvocatoriasStore } from "@/app/shared/convocatorias.store";
import { ConfirmDelete } from "./ConfirmDelete";
import { formatCurrency } from "../utils/FormatCurrency";
import { CiCalendar } from "react-icons/ci";
import ProjectPlanningGridV2 from "../planDesarrollo/components/planDesarrolloV2";
import { useSearchParams } from "react-router-dom";

const columns = [
  { key: "convocatoria", label: "Convocatoria" },
  { key: "consecutivo", label: "Consecutivo" },
  {
    key: "direccion_oficina_regional",
    label: "Dirección (Centro de Formación)",
  },
  { key: "tipo_postulacion", label: "Mecanismo" },
  { key: "nuevo_estado", label: "Estado" },
  { key: "nombre", label: "Nombre de la convocatoria" },
  { key: "valor_solicitado", label: "Valor Solicitado" },
  { key: "valor_aprobado", label: "Valor Aprobado" },
  { key: "diferencia_presupuesto", label: "Diferencia Presupuesto" },
  { key: "fecha_aprobacion", label: "Fecha Aprobación" },
  { key: "fecha_inicio", label: "Fecha Inicio" },
  { key: "fecha_fin", label: "Fecha Fin" },
  {
    key: "observaciones",
    label: "Observaciones de la convocatoria (en caso de que aplique)",
  },
  { key: "url", label: "URL" },
  { key: "acciones", label: "Acciones" },
];

const rowsPerPage = 5;

export default function ConvocatoriasTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const proyectoParam = searchParams.get("proyecto");
  const newParams = new URLSearchParams(searchParams);

  const handleSetParam = (_id: string) => {
    clearParams();

    newParams.set("proyecto", _id);
    setSearchParams(newParams);
  };

  const clearParams = () => {
    newParams.delete("proyecto");
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (proyectoParam) {
      getSingleConvocatoria(proyectoParam);
    }
  }, [proyectoParam]);

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // const [planningOpen, setPlanningOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { convocatorias } = useConvocatorias();
  const { user } = useAuthStore();
  const { getSingleConvocatoria, singleConvocatoria } = useConvocatoriasStore();

  const handleEdit = async (id: string) => {
    await getSingleConvocatoria(id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    await getSingleConvocatoria(id);
    setIsDeleteOpen(true);
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
        isStriped
        aria-label="Tabla de Convocatorias con paginación"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="success"
                page={page}
                total={pages}
                variant="flat"
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        classNames={{
          table: "min-h-[400px] table-auto",
        }}
        topContentPlacement="inside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className={
                column.key === "nombre"
                  ? "min-w-[300px] w-[350px] truncate"
                  : column.key === "observaciones"
                    ? "min-w-[400px] w-[450px] truncate"
                    : ""
              }
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encontraron convocatorias"}
          items={paginatedData}
          loadingContent={<Spinner color="white" />}
          loadingState={convocatorias.length === 0 ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell
                  className={
                    columnKey === "nombre" || columnKey === "observaciones"
                      ? "whitespace-normal break-words"
                      : ""
                  }
                >
                  {columnKey === "acciones" &&
                    [
                      "superadmin",
                      "dinamizador",
                      "Linvestigador",
                      "investigador",
                    ].includes(user?.role ?? "") ? (
                    <div className="flex gap-2">
                      <Tooltip content="Editar proyecto" placement="top">
                        <Button
                          isIconOnly
                          color="warning"
                          radius="full"
                          size="md"
                          variant="bordered"
                          onClick={() => handleEdit(item._id)}
                        >
                          <FaEdit />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Eliminar proyecto" placement="top">
                        <Button
                          isIconOnly
                          color="danger"
                          radius="full"
                          size="md"
                          variant="bordered"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          <RiDeleteBin2Line />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Ver plan de desarrollo" placement="top">
                        <Button
                          isIconOnly
                          color="primary"
                          radius="full"
                          size="md"
                          variant="bordered"
                          onClick={() => {
                            // setPlanningOpen((prev) => !prev);
                            handleSetParam(item._id);
                            // getSingleConvocatoria(item._id);
                          }}
                        >
                          <CiCalendar />
                        </Button>
                      </Tooltip>
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
                  ) : columnKey === "diferencia_presupuesto" ||
                    columnKey === "valor_solicitado" ||
                    columnKey === "valor_aprobado" ? (
                    formatCurrency(
                      getKeyValue(item as { [key: string]: any }, columnKey)
                    )
                  ) : (
                    getKeyValue(item as { [key: string]: any }, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {["superadmin", "dinamizador", "Linvestigador", "investigador"].includes(
        user?.role ?? ""
      ) &&
        singleConvocatoria && (
          <ReusableModal
            isOpen={isOpen}
            modalTitle="Editar Convocatoria"
            onClose={() => setIsOpen(false)}
            onSubmit={() => setIsOpen(false)}
          >
            <div className="flex justify-end mt-4">
              <UploadConvocatoriaForm
                convocatoriaId={singleConvocatoria._id}
                initialValues={
                  singleConvocatoria as unknown as IUploadConvocatoriaReq
                }
                method="edit"
                userId={user?.userId ?? ""}
              />
            </div>
          </ReusableModal>
        )}

      {["superadmin", "dinamizador", "Linvestigador", "investigador"].includes(
        user?.role ?? ""
      ) &&
        singleConvocatoria && (
          <ReusableModal
            isOpen={isDeleteOpen}
            modalTitle="Eliminar Convocatoria"
            onClose={() => setIsDeleteOpen(false)}
            onSubmit={() => setIsDeleteOpen(false)}
          >
            <div className="flex justify-end mt-4">
              <ConfirmDelete
                convocatoria={singleConvocatoria}
                onClose={() => setIsDeleteOpen(false)}
              />
            </div>
          </ReusableModal>
        )}

      {proyectoParam &&
        ["superadmin", "dinamizador", "Linvestigador", "investigador"].includes(
          user?.role ?? ""
        ) &&
        singleConvocatoria && (
          <ReusableModal
            isOpen={!!proyectoParam}
            modalTitle="Plan Financiero"
            size="full"
            onClose={() => {
              clearParams();
            }}
            onSubmit={() => {
              clearParams();
            }}
          >
            <div className="flex justify-end mt-4 flex-col gap-4">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-bold">Proyecto:</h2>
                </CardHeader>
                <CardBody className="p-4">
                  <div className="flex flex-col gap-2 w-full">
                    <p className="truncate max-w-xl text-sm">
                      <strong>Nombre:</strong> {singleConvocatoria?.nombre}
                    </p>
                    <p className="truncate max-w-xl text-sm">
                      <strong>Consecutivo:</strong>{" "}
                      {singleConvocatoria?.consecutivo}
                    </p>
                    <p className="truncate max-w-xl text-sm">
                      <strong>Dirección:</strong>{" "}
                      {singleConvocatoria?.direccion_oficina_regional}
                    </p>
                    <p className="truncate max-w-xl text-sm">
                      <strong>Tipo de Postulación:</strong>{" "}
                      {singleConvocatoria?.tipo_postulacion}
                    </p>
                    <p className="truncate max-w-xl text-sm">
                      <strong>Estado:</strong>{" "}
                      {singleConvocatoria?.nuevo_estado}
                    </p>
                    <p className="truncate max-w-xl text-sm">
                      <strong>Observaciones:</strong>{" "}
                      {singleConvocatoria?.observaciones}
                    </p>
                  </div>
                </CardBody>
              </Card>
              <ProjectPlanningGridV2
                convocatoria={singleConvocatoria}
                onClose={() => clearParams()}
              />
            </div>
          </ReusableModal>
        )}
    </>
  );
}
