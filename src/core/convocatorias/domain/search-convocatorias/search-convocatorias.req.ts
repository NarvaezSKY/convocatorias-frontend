export interface ISearchConvocatoriasReq {
  _id?: string;
  convocatoria?: string | string[];
  consecutivo?: string;
  direccion_oficina_regional?: string | string[];
  tipo_postulacion?: string | string[];
  nuevo_estado?: string | string[];
  nombre?: string;
  valor?: string;
  fecha_aprobacion?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  observaciones?: string;
  user_id?: string;
  year?: string | string[];
  users?: string;
  departamentosDeImpacto?: string | string[];
  municipiosDeImpacto?: string | string[];
  tiposPoblacionesAtendidas?: string | string[];
  numeroBeneficiariosDirectos?: string;
  numeroBeneficiariosIndirectos?: string;
  programasRelacionados?: string | string[];
}
