export interface ListaEmpresaResponse {
  success: boolean;
  message: string;
  data: EmpresaResponse[];
}

export interface EmpresaResponse {
  id_empresa: number;
  ruc: string;
  razon_social: string;
  unix: string;
  tarifa: string;
}

export interface Empresa {
  id: string;
  text: string;
}
