export interface User {
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  username: string;
  id: number;
}

export interface UserResponse {
  data: {
    access_token: string;
    apellido_materno: string;
    apellido_paterno: string;
    expires_in: string;
    id_personal: number;
    kescope: string;
    nombre_personal: string;
    token_type: string;
  };

  message: string;
  success: boolean;
}
