export interface AfiliadoProps {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  tipo_documento: number;
  nro_documento: number;
  foto?: string;
  sexo: string;
  estado_civil: string;
  fecha_nacimiento: string;
  correo: string;
  telefono: number;
  localidad: string;
  direccion: string;
  condicion_fumador: number;
  enfermedad_oncologica: number;
  terminos_condiciones: number;
  politicas_privacidad: number;
  fines_adicionales: number;
  id_cliente_principal: number;
  id_nacionalidad: number;
  id_parentesco: number;
}

export interface AfiliadoResponse {
  success: boolean;
  message: string;
  data: string;
}
