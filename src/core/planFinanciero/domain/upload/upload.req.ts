export interface  IUploadPlanFinancieroReq {
  convocatoria: string; // ID de la convocatoria
  metadata: {
    rows: number;
    columns: number;
    createdAt?: string; // opcional, se puede generar en backend
  };
  structure: {
    rows: string[];
    columns: string[];
  };
  data: {
    [actividad: string]: {
      [mes: string]: string;
    };
  };
}
