import { IBeneficiarioPorMunicipio } from "../upload-convocatorias";

export interface IPatchConvocatoriasReq {
    convocatoria?: string;
    consecutivo?: string;
    direccion_oficina_regional?: string;
    tipo_postulacion?: string;
    nuevo_estado?: string;
    nombre?: string;
    valor?: string;
    fecha_aprobacion?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    observaciones?: string;
    user_id?: string;
    url?: string;
    valor_solicitado?: number | string;
    valor_aprobado?: number | string;
    diferencia_presupuesto?: number | string;

    departamentosDeImpacto?: string[];
    municipiosDeImpacto?: string[];
    tiposPoblacionesAtendidas?: string[];
    numeroBeneficiariosDirectos?: number | string;
    numeroBeneficiariosIndirectos?: number | string;
    beneficiariosPorMunicipio?: IBeneficiarioPorMunicipio[];
    programasRelacionados?: string[];
}