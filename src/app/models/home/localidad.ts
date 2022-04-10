export interface LocalidadResponse {
  success: boolean;
  message: string;
  data: Localidad[];
}

interface Localidad {
  idubigeo: number;
  departamento: string;
  provincia: string;
  distrito: string;
  capital_distrito: string;
  ubigeo_poblado: string;
  centro_poblado: string;
  codigo_postal: string;
  estado: number;
}
