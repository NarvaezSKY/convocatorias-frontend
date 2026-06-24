import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Button,
  Pagination,
  Tooltip,
  Chip,
} from "@heroui/react";
import { useAtencionEspecialJudicial } from "../hooks/useAtencionEspecialJudicial";
import { useAtencionEspecialJudicialStore } from "@/app/shared/atencionEspecialJudicial.store";
import { useAuthStore } from "@/app/shared/auth.store";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState, useMemo } from "react";
import ReusableModal from "@/app/shared/components/Modal";
import { CreateCaseForm } from "./CreateCaseForm";

const columns = [
  { key: "caso_o_sentencia", label: "Caso / Sentencia" },
  { key: "municipios", label: "Municipios" },
  { key: "fecha_expedicion_requerimiento", label: "Fecha Expedición" },
  { key: "fecha_limite_requerimiento", label: "Fecha Límite" },
  { key: "case_estado", label: "Estado" },
  { key: "case_acciones", label: "Acciones del Caso" },
  { key: "acciones", label: "Acciones" },
];

const rowsPerPage = 10;

const estadoColorMap: Record<string, "warning" | "primary" | "success"> = {
  "Por atender": "warning",
  "En atención": "primary",
  Atendido: "success",
};

export default function CasesTable() {
  const { cases, loading, handleDelete } = useAtencionEspecialJudicial();
  const { getCaseById, singleCase, clearSingleCase } = useAtencionEspecialJudicialStore();
  const { user } = useAuthStore();

  const [page, setPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const pages = useMemo(() => {
    return cases.length ? Math.ceil(cases.length / rowsPerPage) : 0;
  }, [cases]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return cases.slice(start, start + rowsPerPage);
  }, [page, cases]);

  const canModify = user?.role === "superadmin" || user?.role === "coordinador";

  const handleEdit = async (id: string) => {
    await getCaseById(id);
    setIsEditOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCaseId) {
      await handleDelete(selectedCaseId);
      setIsDeleteOpen(false);
      setSelectedCaseId(null);
    }
  };

  const renderCell = (item: any, columnKey: string) => {
    if (columnKey === "acciones") {
      return canModify ? (
        <div className="flex gap-2">
          <Tooltip content="Editar caso" placement="top">
            <Button
              isIconOnly
              color="warning"
              radius="full"
              size="md"
              variant="flat"
              onClick={() => handleEdit(item._id)}
            >
              <FaEdit />
            </Button>
          </Tooltip>
          <Tooltip content="Eliminar caso" placement="top">
            <Button
              isIconOnly
              color="danger"
              radius="full"
              size="md"
              variant="flat"
              onClick={() => {
                setSelectedCaseId(item._id);
                setIsDeleteOpen(true);
              }}
            >
              <RiDeleteBin2Line />
            </Button>
          </Tooltip>
        </div>
      ) : null;
    }

    if (columnKey === "case_estado") {
      return (
        <Chip
          color={estadoColorMap[item.case_estado] || "default"}
          variant="flat"
        >
          {item.case_estado}
        </Chip>
      );
    }

    if (columnKey === "municipios") {
      return (
        <div className="flex flex-col gap-1">
          {item.municipios?.map((m: any, i: number) => (
            <div key={i} className="text-sm">
              <span className="font-semibold">{m.municipio}</span>
              <span className="text-default-500"> - {m.aso_org_terri}</span>
            </div>
          ))}
        </div>
      );
    }

    return item[columnKey as keyof typeof item];
  };

  return (
    <>
      <Table
        isStriped
        aria-label="Tabla de Atención Especial - Judicial"
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
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="No se encontraron casos"
          items={paginatedData}
          loadingContent={<Spinner color="white" />}
          loadingState={loading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, String(columnKey))}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ReusableModal
        isOpen={isDeleteOpen}
        modalTitle="Eliminar caso"
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedCaseId(null);
        }}
      >
        <p className="text-default-700 mb-4">
          ¿Estás seguro de eliminar este caso? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-2 w-full justify-end">
          <Button color="danger" variant="flat" onClick={confirmDelete}>
            Eliminar
          </Button>
          <Button
            color="default"
            variant="flat"
            onClick={() => {
              setIsDeleteOpen(false);
              setSelectedCaseId(null);
            }}
          >
            Cancelar
          </Button>
        </div>
      </ReusableModal>

      {singleCase && (
        <ReusableModal
          isOpen={isEditOpen}
          modalTitle="Editar caso"
          size="2xl"
          onClose={() => {
            setIsEditOpen(false);
            clearSingleCase();
          }}
          onSubmit={() => setIsEditOpen(false)}
        >
          <CreateCaseForm
            method="edit"
            caseId={singleCase._id}
            initialValues={singleCase}
            onClose={() => {
              setIsEditOpen(false);
              clearSingleCase();
            }}
          />
        </ReusableModal>
      )}
    </>
  );
}
