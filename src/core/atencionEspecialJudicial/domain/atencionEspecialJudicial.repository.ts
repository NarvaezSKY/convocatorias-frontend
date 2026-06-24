import { ICaseRes } from './get-all-cases';
import { ICreateCaseReq } from './create-case';
import { IUpdateCaseReq } from './update-case';
import { IFilterCasesReq } from './filter-cases';

export interface IAtencionEspecialJudicialRepository {
  getAllCases(): Promise<ICaseRes[]>;
  getCaseById(id: string): Promise<ICaseRes>;
  createCase(data: ICreateCaseReq): Promise<ICaseRes>;
  updateCase(id: string, data: IUpdateCaseReq): Promise<ICaseRes>;
  filterCases(data: IFilterCasesReq): Promise<ICaseRes[]>;
  deleteCase(id: string): Promise<any>;
}
