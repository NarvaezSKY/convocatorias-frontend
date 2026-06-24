export interface IMunicipioItem {
  municipio: string;
  aso_org_terri: string;
}

export interface ICaseRes {
  _id: string;
  caso_o_sentencia: string;
  municipios: IMunicipioItem[];
  fecha_expedicion_requerimiento: string;
  fecha_limite_requerimiento: string;
  case_estado: 'Por atender' | 'En atención' | 'Atendido';
  case_acciones: string;
  createdAt?: string;
  updatedAt?: string;
}
