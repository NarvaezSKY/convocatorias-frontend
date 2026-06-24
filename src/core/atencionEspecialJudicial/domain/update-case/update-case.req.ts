import { IMunicipioItem } from '../get-all-cases';

export interface IUpdateCaseReq {
  caso_o_sentencia?: string;
  municipios?: IMunicipioItem[];
  fecha_expedicion_requerimiento?: string;
  fecha_limite_requerimiento?: string;
  case_estado?: 'Por atender' | 'En atención' | 'Atendido';
  case_acciones?: string;
}
