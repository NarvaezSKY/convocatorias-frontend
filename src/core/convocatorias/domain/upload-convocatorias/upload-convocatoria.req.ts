export interface IUploadConvocatoriaReq{
    year: number
    convocatoria: string;
    consecutivo: string;
    direccion_oficina_regional: string;
    tipo_postulacion: string;
    nuevo_estado?: string;
    nombre: string;
    fecha_aprobacion?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    observaciones?: string;
    user_id: string;
    url: string;
    valor_solicitado: string;
    valor_aprobado: string;
    diferencia_presupuesto: string;
}