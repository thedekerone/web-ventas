export interface ListaParienteResponse {
  success: boolean;
  message: string;
  data: ListaParienteResponseData[];
}

export interface ListaParienteResponseData {
  id_parentesco: number;
  nombre: string;
  fecha_registro: string;
  estado: number;
}
