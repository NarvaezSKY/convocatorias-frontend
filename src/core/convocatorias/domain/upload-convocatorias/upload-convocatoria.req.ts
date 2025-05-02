export interface IUploadConvocatoriaReq{
    convocatoria: string;
    consecutivo: string;
    direccion_oficina_regional: string;
    tipo_postulacion: string;
    nuevo_estado?: string;
    nombre: string;
    valor: string;
    fecha_aprobacion?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    observaciones?: string;
    user_id: string;
}