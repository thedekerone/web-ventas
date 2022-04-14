export interface NacionalidadResponse {
  success: boolean;
  message: string;
  data: NacionalidadResponseData[];
}

export interface NacionalidadResponseData {
  estado: number;
  gentilicio: string;
  id_nacionalidad: number;
  iso_nac: string;
  pais: string;
}
