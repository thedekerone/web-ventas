export interface TarifaResponse {
  message: string;
  success: boolean;
  data: TarifaResponseData[];
}

export interface TarifaResponseData {
  id_tarifario: number;
  maximo: string;
  minimo: string;
  periodo: number;
  valor: number;
}
