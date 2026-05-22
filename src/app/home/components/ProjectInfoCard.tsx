import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
} from "@heroui/react";
import { MdLocationOn, MdDateRange, MdDescription } from "react-icons/md";
import { HiDocumentText, HiOfficeBuilding } from "react-icons/hi";
import { BsFileEarmarkText } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { formatCurrency } from "../utils/FormatCurrency";

interface ProjectInfoCardProps {
    project: any;
}

const toBeneficiariosNumber = (value: unknown): number | null => {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

export function ProjectInfoCard({ project }: ProjectInfoCardProps) {
    const beneficiariosDirectos = toBeneficiariosNumber(project?.numeroBeneficiariosDirectos);
    const beneficiariosIndirectos = toBeneficiariosNumber(project?.numeroBeneficiariosIndirectos);
    const hasBeneficiarios =
        beneficiariosDirectos !== null || beneficiariosIndirectos !== null;
    const hasBudgetValues =
        project?.valor_solicitado !== undefined ||
        project?.valor_aprobado !== undefined ||
        project?.diferencia_presupuesto !== undefined;

    return (
        <Card className="bg-default-100">
            <CardHeader className="flex gap-3 pb-4">
                <div className="flex flex-col w-full">
                    <h2 className="text-2xl font-bold text-success dark:text-success">
                        Información del Proyecto
                    </h2>
                    <p className="text-sm text-default-500">{project?.consecutivo}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="gap-6 p-6">
                {/* Nombre del Proyecto */}
                <div className="bg-white dark:bg-default-100 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                        <HiDocumentText className="text-2xl text-primary mt-1 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-default-500 font-semibold mb-1">
                                NOMBRE DEL PROYECTO
                            </p>
                            <p className="text-base font-medium wrap-break-word">
                                {project?.nombre}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid de información principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Año */}
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <BsFileEarmarkText className="text-lg text-primary" />
                            <p className="text-xs text-default-500 font-semibold">AÑO</p>
                        </div>
                        <p className="text-sm wrap-break-word">{project?.year || "N/A"}</p>
                    </div>

                    {/* Convocatoria */}
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <BsFileEarmarkText className="text-lg text-primary" />
                            <p className="text-xs text-default-500 font-semibold">CONVOCATORIA</p>
                        </div>
                        <p className="text-sm wrap-break-word">{project?.convocatoria || "N/A"}</p>
                    </div>

                    {/* Centro de Formación */}
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <HiOfficeBuilding className="text-lg text-warning" />
                            <p className="text-xs text-default-500 font-semibold">
                                CENTRO DE FORMACIÓN
                            </p>
                        </div>
                        <p className="text-sm wrap-break-word">
                            {project?.direccion_oficina_regional}
                        </p>
                    </div>

                    {/* Mecanismo */}
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <BsFileEarmarkText className="text-lg text-secondary" />
                            <p className="text-xs text-default-500 font-semibold">MECANISMO</p>
                        </div>
                        <Chip color="secondary" size="sm" variant="flat">
                            {project?.tipo_postulacion}
                        </Chip>
                    </div>

                    {/* Estado */}
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <MdDescription className="text-lg text-success" />
                            <p className="text-xs text-default-500 font-semibold">ESTADO</p>
                        </div>
                        <Chip color="success" size="sm" variant="flat">
                            {project?.nuevo_estado}
                        </Chip>
                    </div>

                    {/* Caso o sentencia */}
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <MdDescription className="text-lg text-primary" />
                            <p className="text-xs text-default-500 font-semibold">CASO O SENTENCIA</p>
                        </div>
                        <p className="text-sm wrap-break-word">{project?.caso_o_sentencia || "N/A"}</p>
                    </div>

                    {/* Fechas */}
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <MdDateRange className="text-lg text-danger" />
                            <p className="text-xs text-default-500 font-semibold">PERÍODO</p>
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <p>
                                <span className="font-medium">Inicio:</span>{" "}
                                {project?.fecha_inicio || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium">Aprobación:</span>{" "}
                                {project?.fecha_aprobacion || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium">Fin:</span>{" "}
                                {project?.fecha_fin || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Presupuesto */}
                {hasBudgetValues && (
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <p className="text-xs text-default-500 font-semibold mb-2">
                            PRESUPUESTO
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div>
                                <p className="text-default-500">Solicitado</p>
                                <p className="font-semibold wrap-break-word">
                                    {project?.valor_solicitado !== undefined
                                        ? formatCurrency(project.valor_solicitado)
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-default-500">Aprobado</p>
                                <p className="font-semibold wrap-break-word">
                                    {project?.valor_aprobado !== undefined
                                        ? formatCurrency(project.valor_aprobado)
                                        : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-default-500">Diferencia</p>
                                <p className="font-semibold wrap-break-word">
                                    {project?.diferencia_presupuesto !== undefined
                                        ? formatCurrency(project.diferencia_presupuesto)
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* URL */}
                {project?.url && (
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <p className="text-xs text-default-500 font-semibold mb-2">URL</p>
                        <a
                            className="text-sm text-primary underline break-all"
                            href={project.url}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {project.url}
                        </a>
                    </div>
                )}

                {/* Observaciones */}
                {project?.observaciones && (
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <MdDescription className="text-lg text-default-400" />
                            <p className="text-xs text-default-500 font-semibold">
                                OBSERVACIONES
                            </p>
                        </div>
                        <p className="text-sm wrap-break-word text-default-700">
                            {project?.observaciones}
                        </p>
                    </div>
                )}

                {/* Programas relacionados */}
                {project?.programasRelacionados && (
                    <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                        <p className="text-xs text-default-500 font-semibold mb-2">
                            PROGRAMAS DE FORMACION INVOLUCRADOS
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(project.programasRelacionados) ? (
                                project.programasRelacionados.map((programa: string, idx: number) => (
                                    <Chip key={idx} color="primary" size="sm" variant="flat">
                                        {programa}
                                    </Chip>
                                ))
                            ) : (
                                <p className="text-sm wrap-break-word">
                                    {project.programasRelacionados}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <Divider className="my-2" />

                {/* Sección de Impacto */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-primary-700 dark:text-primary-400 flex items-center gap-2">
                        <MdLocationOn className="text-2xl" />
                        Impacto Geográfico y Social
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Departamentos */}
                        {project?.departamentosDeImpacto && (
                            <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                                <p className="text-xs text-default-500 font-semibold mb-2">
                                    DEPARTAMENTOS
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(project.departamentosDeImpacto) ? (
                                        project.departamentosDeImpacto.map((dept: string, idx: number) => (
                                            <Chip key={idx} color="primary" size="sm" variant="dot">
                                                {dept}
                                            </Chip>
                                        ))
                                    ) : (
                                        <p className="text-sm">{project.departamentosDeImpacto}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Municipios */}
                        {project?.municipiosDeImpacto && (
                            <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm">
                                <p className="text-xs text-default-500 font-semibold mb-2">
                                    MUNICIPIOS
                                </p>
                                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                                    {Array.isArray(project.municipiosDeImpacto) ? (
                                        project.municipiosDeImpacto.map((mun: string, idx: number) => (
                                            <Chip
                                                key={idx}
                                                color="primary"
                                                size="sm"
                                                variant="bordered"
                                            >
                                                {mun}
                                            </Chip>
                                        ))
                                    ) : (
                                        <p className="text-sm">{project.municipiosDeImpacto}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Tipos de Población */}
                        {project?.tiposPoblacionesAtendidas && (
                            <div className="bg-white dark:bg-default-100 rounded-lg p-4 shadow-sm md:col-span-2">
                                <p className="text-xs text-default-500 font-semibold mb-2">
                                    POBLACIONES BENEFICIADAS
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(project.tiposPoblacionesAtendidas) ? (
                                        project.tiposPoblacionesAtendidas.map((tipo: string, idx: number) => (
                                            <Chip key={idx} color="secondary" size="sm" variant="flat">
                                                {tipo}
                                            </Chip>
                                        ))
                                    ) : (
                                        <p className="text-sm">{project.tiposPoblacionesAtendidas}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Beneficiarios */}
                        {hasBeneficiarios && (
                                <div className="bg-linear-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 rounded-lg p-4 shadow-sm md:col-span-2">
                                    <div className="flex items-center gap-2 mb-3">
                                        <IoMdPeople className="text-2xl text-success" />
                                        <p className="text-xs text-default-500 font-semibold">
                                            NÚMERO DE BENEFICIARIOS
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {beneficiariosDirectos !== null && (
                                            <div className="text-center">
                                                <p className="text-3xl font-bold text-success">
                                                    {beneficiariosDirectos.toLocaleString("es-CO")}
                                                </p>
                                                <p className="text-xs text-default-500 mt-1">Directos</p>
                                            </div>
                                        )}
                                        {beneficiariosIndirectos !== null && (
                                            <div className="text-center">
                                                <p className="text-3xl font-bold text-primary">
                                                    {beneficiariosIndirectos.toLocaleString("es-CO")}
                                                </p>
                                                <p className="text-xs text-default-500 mt-1">Indirectos</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
