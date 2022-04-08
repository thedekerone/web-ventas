export interface User {
    id: number;
    nombre: string;
    apellido?: string;
    correo: string;
    role?: string;
    token: string;
}