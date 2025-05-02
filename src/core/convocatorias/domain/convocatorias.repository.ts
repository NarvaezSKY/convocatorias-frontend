import { ISearchConvocatoriasReq } from './search-convocatorias';
import { IGetAllConvocatoriasRes } from './get-all-convocatorias';
import { IUploadConvocatoriaReq } from './upload-convocatorias';

export interface IConvocatoriasRepository {
  getAllConvocatorias(): Promise<IGetAllConvocatoriasRes[]>;
  searchConvocatorias(data: ISearchConvocatoriasReq): Promise<IGetAllConvocatoriasRes[]>;
  uploadConvocatorias (data: IUploadConvocatoriaReq ): Promise<any>;
}