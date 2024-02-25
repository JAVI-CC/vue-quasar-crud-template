import type { Rol } from 'src/modules/rol/interfaces/rolInterface';

export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  nombre_completo: string;
  email: string;
  is_admin: boolean;
  is_email_verified: boolean;
  avatar_url: string;
  rol: Rol;
}

export interface UserForm {
  nombre: string | null;
  apellidos: string | null;
  email: string | null;
  password: string | null;
  password_confirmation: string | null;
  avatar_imagen_base64: string | null;
  rol: Rol | null;
  rol_id: number | null;
}