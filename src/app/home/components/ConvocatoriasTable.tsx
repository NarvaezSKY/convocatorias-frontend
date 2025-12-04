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
import { toast } from "sonner";

const columns = [
  { key: "year", label: "Año" },
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

interface ConvocatoriasTableProps {
  mode?: "home" | "profile" | "profileConsult";
  isOwnProfile?: boolean;
}

const rowsPerPage = 10;

export default function ConvocatoriasTable({ mode = "home", isOwnProfile = false }: ConvocatoriasTableProps) {
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
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));

  const { convocatorias, profileConvocatorias } = useConvocatorias();
  const { user } = useAuthStore();
  const { getSingleConvocatoria, singleConvocatoria, filterLoading, loading, addUserToConvocatoria, removeUserFromConvocatoria } = useConvocatoriasStore();

  const handleEdit = async (id: string) => {
    await getSingleConvocatoria(id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    await getSingleConvocatoria(id);
    setIsDeleteOpen(true);
  };

  const handleSaveParticipation = async () => {
    if (!user?.userId) {
      toast.error("Debes iniciar sesión para participar");
      return;
    }
    const keysArray = selectedKeys === "all" ? sourceData.map(d => d._id) : Array.from(selectedKeys as Set<string>);
    if (!keysArray.length) {
      toast.error("Selecciona al menos un proyecto");
      return;
    }
    try {
      await Promise.all(
        keysArray.map((convocatoriaId) =>
          addUserToConvocatoria({ convocatoria_id: convocatoriaId, userId: user.userId })
        )
      );
      toast.success("Participación guardada para los proyectos seleccionados");
      setSelectedKeys(new Set([]));
    } catch (e) {
      toast.error("No se pudo registrar tu participación");
      console.error(e);
    }
  };

  // Fuente de datos según el modo
  const sourceData = useMemo(() => {
    if (mode === "profileConsult") {
      return profileConvocatorias ?? [];
    }
    return convocatorias;
  }, [mode, profileConvocatorias, convocatorias]);

  const pages = useMemo(() => {
    return sourceData.length ? Math.ceil(sourceData.length / rowsPerPage) : 0;
  }, [sourceData]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sourceData.slice(start, start + rowsPerPage);
  }, [page, sourceData]);

  // Reordenar columnas: en modo "profile" colocar "Acciones" primero
  const computedColumns = useMemo(() => {
    if (mode === "profile") {
      const acciones = columns.find((c) => c.key === "acciones")!;
      const rest = columns.filter((c) => c.key !== "acciones");
      return [acciones, ...rest];
    }
    return columns;
  }, [mode]);

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
        selectedKeys={mode === "profile" ? selectedKeys : undefined}
        selectionMode={mode === "profile" ? "multiple" : "none"}
        topContent={
          mode === "profile" ? (
            <div className="flex w-full justify-end">
              <Button fullWidth color="success" size="lg" variant="flat" onClick={handleSaveParticipation}>
                Guardar
              </Button>
            </div>
          ) : null
        }
        topContentPlacement="inside"
        onSelectionChange={mode === "profile" ? setSelectedKeys : undefined}
      >
        <TableHeader columns={computedColumns}>
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
          emptyContent="No se encontraron convocatorias"
          items={paginatedData}
          loadingContent={<Spinner color="white" />}
          loadingState={(loading || filterLoading) ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell
                  className={
                    columnKey === "nombre" || columnKey === "observaciones"
                      ? "whitespace-normal wrap-break-word"
                      : ""
                  }
                >
                  {columnKey === "acciones"
                    ? (
                      mode === "profile"
                        ? (
                          // En modo perfil, se usa selección múltiple y el botón Guardar en el topContent
                          null
                        )
                        : mode === "profileConsult"
                          ? (
                            isOwnProfile ? (
                              <Button
                                color="danger"
                                size="sm"
                                variant="flat"
                                onClick={async () => {
                                  if (!user?.userId) {
                                    toast.error("Debes iniciar sesión");
                                    return;
                                  }
                                  try {
                                    await removeUserFromConvocatoria({ convocatoria_id: item._id, userId: user.userId });
                                    console.log(item._id, user.userId);
                                    toast.success("Proyecto removido de tu perfil");
                                  } catch (e) {
                                    toast.error("No se pudo remover el proyecto");
                                    console.error(e);
                                  }
                                }}
                              >
                                Remover este proyecto de mi perfil
                              </Button>
                            ) : null
                          )
                        : ([
                          "superadmin",
                          "dinamizador",
                          "Linvestigador",
                          "investigador",
                        ].includes(user?.role ?? "")
                          ? (
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
                                    handleSetParam(item._id);
                                  }}
                                >
                                  <CiCalendar />
                                </Button>
                              </Tooltip>
                            </div>
                          )
                          : null)
                    )
                    : columnKey === "url"
                      ? (
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
                      )
                      : columnKey === "diferencia_presupuesto" ||
                        columnKey === "valor_solicitado" ||
                        columnKey === "valor_aprobado"
                        ? (
                          formatCurrency(
                            getKeyValue(item as { [key: string]: any }, columnKey)
                          )
                        )
                        : (
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
            size="xl"
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
