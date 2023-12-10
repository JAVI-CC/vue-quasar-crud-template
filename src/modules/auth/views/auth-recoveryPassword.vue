<script setup lang="ts">
import { ref, Ref, provide } from 'vue';
import AuthLayout from '../components/AuthLayout.vue';
import AuthRecoveryPasswordForm from '../components/AuthRecoveryPasswordForm.vue'
import { MessageErrors } from 'src/modules/common/interfaces/commonInterface';
import useAuth from '../composables/useAuth';
import { RecoveryPasswordType } from '../types/authType';

const email: Ref<string> = ref<string>('');
provide(RecoveryPasswordType, email);

const messageErrors = ref<MessageErrors | string>('');
const isLoading = ref<boolean>(false);
const { recoveryPassword, redirectLogin } = useAuth();

const submitRecoveryPassword = async (): Promise<void> => {
  isLoading.value = true;
  const resp: void | string | string[] | boolean = await recoveryPassword(email.value);

  if (resp === true) {
    messageErrors.value = '';
    redirectLogin(email.value);
  } else {
    messageErrors.value = resp as string;
  }

  isLoading.value = false;
};
</script>

<template>
  <AuthLayout :isLoading="isLoading">
    <template #card-content>
      <AuthRecoveryPasswordForm @submitForm="submitRecoveryPassword()" :messageErrors="messageErrors"
        :isShowMessageErrors="!!messageErrors" />
    </template>
  </AuthLayout>
</template>

<style lang="sass" scoped></style>