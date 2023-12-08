import type { Rol } from 'src/modules/rol/interfaces/rolInterface';

export interface UserAuth {
  id: string;
  nombre: string;
  apellidos: string;
  nombre_completo: string;
  email: string;
  is_admin: boolean;
  is_email_verified: boolean;
  rol: Rol;
  is_logged?: boolean | null;
  token?: string | null;
}

export interface Login {
  email: string;
  password: string;
}

export interface AuthChangePasswordForm {
  password: string | null;
  password_confirmation: string | null;
}


export interface AuthVerificationUser {
  id: string;
  hash: string;
  expires: string;
  signature: string;
  token: string;
}
