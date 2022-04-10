export interface Usuario {
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombres_completos: string;
  sexo: string;
  estado_civil: string;
  fecha_nacimiento: string;
  nro_documento: string;
  nacionalidad: string;
}

export interface UsuarioResponse {
  success: boolean;
  data: Usuario;
}
