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
// import { useEffect, useState } from "react";
// import Filtros from "./Filters";
// import { ISearchConvocatoriasReq } from "../../../core/convocatorias/domain/search-convocatorias";
// import { FaSearch } from "react-icons/fa";
// import { IoMdCloseCircle } from "react-icons/io";

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
  { key: "url", label: "URL" },
  { key: "acciones", label: "Acciones" },
];

export default function ConvocatoriasTable() {
  // const [filtros, setFiltros] = useState<ISearchConvocatoriasReq>({});

  const {
    convocatorias,
    // loading,
    loaderRef,
    scrollerRef,
    handleDelete,
    // handleSearch,
  } = useConvocatorias();
  const { user } = useAuthStore();

  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     const filtrosLimpios = Object.fromEntries(
  //       Object.entries(filtros).filter(([_, v]) => v?.toString().trim() !== "")
  //     );

  //     handleSearch(filtrosLimpios);
  //   }, 500);

  //   return () => clearTimeout(delayDebounce);
  // }, [filtros]);

  // const [mostrarFiltros, setMostrarFiltros] = useState(false);

  return (
    <>
      {/* <Button
        isIconOnly
        className="mb-4"
        color="primary"
        radius="full"
        size="md"
        variant="bordered"
        onClick={() => setMostrarFiltros((prev) => !prev)}
      >
        {mostrarFiltros ? <IoMdCloseCircle /> : <FaSearch />}
      </Button>
      {mostrarFiltros && (
        <Filtros
          filtros={filtros}
          onChange={(nuevoFiltro: Partial<ISearchConvocatoriasReq>) =>
            setFiltros((prev) => ({ ...prev, ...nuevoFiltro }))
          }
        />
      )} */}

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
                        onClick={() => alert(`Editando ${item.id}`)}
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
    </>
  );
}
