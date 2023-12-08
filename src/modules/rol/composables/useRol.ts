import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRolStore } from '../stores/rolStore';

const useRoles = () => {
  const rolStore = useRolStore();
  const { roles } = storeToRefs(rolStore);

  const getRoles = async (): Promise<void> => {
    await rolStore.getRoles();
  };

  //Redirects
  //End Redirects

  return {
    //Methods
    getRoles,

    //Variables
    roles: computed(() => roles.value),
  };
};

export default useRoles;
