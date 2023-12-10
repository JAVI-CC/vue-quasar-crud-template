import type { InjectionKey, Ref } from 'vue';
import type { LoginForm, AuthChangePasswordForm } from '../interfaces/authInterface';

export const LoginFormType = Symbol() as InjectionKey<LoginForm>;
export const RecoveryPasswordType = Symbol() as InjectionKey<Ref<string>>;
export const AuthChangePasswordFormType = Symbol() as InjectionKey<AuthChangePasswordForm>;