import { ISearchConvocatoriasReq } from './search-convocatorias';
import { IGetAllConvocatoriasRes } from './get-all-convocatorias';
import { IUploadConvocatoriaReq } from './upload-convocatorias';
import { IPatchConvocatoriasReq } from './patch-convocatorias';

export interface IConvocatoriasRepository {
  getAllConvocatorias(): Promise<IGetAllConvocatoriasRes[]>;
  searchConvocatorias(data: ISearchConvocatoriasReq): Promise<IGetAllConvocatoriasRes[]>;
  uploadConvocatorias(data: IUploadConvocatoriaReq): Promise<any>;
  deleteConvocatorias(id: number): Promise<any>;
  getSingleConvocatoria (id: number): Promise<IGetAllConvocatoriasRes>
  patchConvocatorias(id: number, data: IPatchConvocatoriasReq): Promise<any>;
}