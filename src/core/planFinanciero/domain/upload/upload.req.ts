export interface IUploadPlanFinancieroReq {
  convocatoria: string;
  metadata: {
    rows: number;
    columns: number;
    totalExecutionPercentage: number;
    createdAt?: string;
  };
  structure: {
    rows: string[];
    columns: string[];
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
