export interface IUploadPlanFinancieroReq {
  convocatoria: string; // ID de la convocatoria
  metadata: {
    rows: number;
    columns: number;
    totalExecutionPercentage: number;
    createdAt?: string; // opcional, se puede generar en backend
  };
  structure: {
    rows: string[]; // Ej: ["Actividad 1", "Actividad 2"]
    columns: string[]; // Ej: ["Mes1", "Mes2", "Mes3"]
  };
  data: {
    [actividad: string]: {
      [mes: string]: {
        proyectado: string;
        ejecutado: string;
      };
    };
  };
}
