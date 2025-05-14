export interface IGetAllConvocatoriasRes {
    _id: string;
    convocatoria: number;
    consecutivo: string;
    direccion_oficina_regional: string;
    tipo_postulacion: string;
    nuevo_estado: string;
    nombre: string;
    fecha_aprobacion: string | null;
    fecha_inicio: string | null;
    fecha_fin: string | null;
    observaciones: string | null;
    user_id: number;
    url: string;
    valor_solicitado: number;
    valor_aprobado: number;
    diferencia_presupuesto: number;
}