export interface IGetAllConvocatoriasRes {
    id: number;
    convocatoria: number;
    consecutivo: string;
    direccion_oficina_regional: string;
    tipo_postulacion: string;
    nuevo_estado: string;
    nombre: string;
    valor: number;
    fecha_aprobacion: string | null;
    fecha_inicio: string | null;
    fecha_fin: string | null;
    observaciones: string | null;
    user_id: number;
}