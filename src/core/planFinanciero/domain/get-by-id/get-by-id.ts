import { IGetAllConvocatoriasRes } from "@/core/convocatorias/domain/get-all-convocatorias";
export interface IGetPlanFinancieroByIdRes {
    _id: string;
    convocatoria: IGetAllConvocatoriasRes;
    metadata: {
        rows: number;
        columns: number;
        createdAt: string;
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
    createdAt: string;
    updatedAt: string;
    __v: number;
}
