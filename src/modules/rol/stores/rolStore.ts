import { ref, readonly } from 'vue';
import { api } from 'boot/axios';
import { defineStore } from 'pinia';
import type { Rol } from '../interfaces/rolInterface';

export const useRolStore = defineStore('rol', () => {
  //State
  const prefixPath = readonly(ref<string>('roles'));
  const roles = ref<Rol[]>([]);
  //End State

  //Getters
  //End Getters

  //Actions
  const getRoles = async (): Promise<void> => {
    try {
      const { data } = await api.get<Rol[]>(`${prefixPath.value}`);
      roles.value = data;
    } catch (error) {
    } finally {
    }
  };
  //End Actions

  const $reset = (): void => {
    roles.value = [];
  };
  //End Setters

  return {
    //State
    roles,

    //Getters

    //Actions
    getRoles,

    //Setters
    $reset,
  };
});
