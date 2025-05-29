import { IGetPlanFinancieroByIdRes } from "./get-by-id"
import { IUploadPlanFinancieroReq } from "./upload"

export interface IPlanFinancieroRepository {
    getSinglePlanFinanciero(id: string): Promise<IGetPlanFinancieroByIdRes>
    createPlanFinanciero(data: any): Promise<IUploadPlanFinancieroReq>
    updatePlanFinanciero(id: string, data: any): Promise<any>

}