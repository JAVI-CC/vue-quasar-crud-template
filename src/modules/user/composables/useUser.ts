import { storeToRefs } from 'pinia';
import { Router, useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import type { User, UserForm } from '../interfaces/userInterface';

const useUser = () => {
  const userStore = useUserStore();
  const { } = storeToRefs(userStore);
  const router: Router = useRouter();

  const getUsers = async (): Promise<User[] | void> => {
    return await userStore.getUsers();
  };

  const getUserById = async (id: string): Promise<User | void> => {
    return await userStore.getUserById(id);
  };

  const addUser = async (payload: UserForm): Promise<boolean | string | string[] | void> => {
    return await userStore.addUser(payload);
  };

  const editUser = async (id: string, payload: UserForm): Promise<boolean | string | string[] | void> => {
    return await userStore.editUser(id, payload);
  };

  const deleteUser = async (id: string): Promise<boolean | string | string[] | void> => {
    return await userStore.deleteUser(id);
  };

  //Redirects
  const redirectUserList = (): void => {
    router.push({ name: 'user-list' });
  };

  const redirectUserAdd = (): void => {
    router.push({ name: 'user-add' });
  };

  const redirectUserEdit = (id: number) => {
    router.push({ name: 'user-edit', params: { id } });
  };
  //End Redirects

  return {
    //Methods
    getUsers,
    getUserById,
    addUser,
    editUser,
    deleteUser,
    redirectUserList,
    redirectUserAdd,
    redirectUserEdit,

    //Variables
  };
};

export default useUser;
