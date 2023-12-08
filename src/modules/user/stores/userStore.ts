import { ref, readonly } from 'vue';
import { api } from 'boot/axios';
import { defineStore } from 'pinia';
import type { User, UserForm } from '../interfaces/userInterface';
import type { Message, MessageErrors } from 'src/modules/common/interfaces/commonInterface';
import { AxiosError } from 'axios';

export const useUserStore = defineStore('user', () => {
  //State
  const prefixPath = readonly(ref<string>('user'));
  //End State

  //Getters
  //End Getters

  //Actions
  const getUsers = async (): Promise<void | User[]> => {
    try {
      const { data } = await api.get<User[]>(`${prefixPath.value}`);
      return data;
    } catch (error) {
    } finally {
    }
  };

  const getUserById = async (id: string): Promise<void | User> => {
    try {
      const { data } = await api.get<User>(`${prefixPath.value}/${id}`);
      return data;
    } catch (error) {
    } finally {
    }
  };

  const addUser = async (payload: UserForm): Promise<void | boolean | string | string[]> => {
    try {
      await api.post<User>(`${prefixPath.value}`, payload);
      return true;
    } catch (error) {
      const err = error as AxiosError<MessageErrors | Message>;
      return err.response?.data?.message;
    } finally {
    }
  };

  const editUser = async (id: string, payload: UserForm): Promise<void | boolean | string | string[]> => {
    try {
      await api.put<User>(`${prefixPath.value}/${id}`, payload);
      return true;
    } catch (error) {
      const err = error as AxiosError<MessageErrors | Message>;
      return err.response?.data?.message;
    } finally {
    }
  };

  const deleteUser = async (id: string): Promise<void | boolean | string | string[]> => {
    try {
      await api.delete<null>(`${prefixPath.value}/${id}`);
      return true;
    } catch (error) {
      const err = error as AxiosError<MessageErrors | Message>;
      return err.response?.data?.message;
    } finally {
    }
  };
  //End Actions

  //Setters
  const $reset = (): void => {
  };
  //End Setters

  return {
    //State

    //Getters

    //Actions
    getUsers,
    getUserById,
    addUser,
    editUser,
    deleteUser,

    //Setters
    $reset,
  };
});
