import { ISearchConvocatoriasReq } from './search-convocatorias';
import { IGetAllConvocatoriasRes } from './get-all-convocatorias';
import { IUploadConvocatoriaReq } from './upload-convocatorias';
import { IPatchConvocatoriasReq } from './patch-convocatorias';

export interface IConvocatoriasRepository {
  getAllConvocatorias(): Promise<IGetAllConvocatoriasRes[]>;
  searchConvocatorias(data: ISearchConvocatoriasReq): Promise<IGetAllConvocatoriasRes[]>;
  uploadConvocatorias(data: IUploadConvocatoriaReq): Promise<any>;
  deleteConvocatorias(id: string): Promise<any>;
  getSingleConvocatoria (id: string): Promise<IGetAllConvocatoriasRes>
  patchConvocatorias(id: string, data: IPatchConvocatoriasReq): Promise<any>;
  downloadReport(data: ISearchConvocatoriasReq): Promise<Blob>;
}