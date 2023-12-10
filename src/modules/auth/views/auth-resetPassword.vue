<script setup lang="ts">
import { ref, reactive, provide, toRef } from 'vue';
import AuthLayout from '../components/AuthLayout.vue';
import { AuthChangePasswordForm } from '../interfaces/authInterface';
import { MessageErrors } from 'src/modules/common/interfaces/commonInterface';
import useAuth from '../composables/useAuth';
import { AuthChangePasswordFormType } from '../types/authType';
import AuthResetPasswordForm from '../components/AuthResetPasswordForm.vue';

interface Props {
  token: string;
}

const props = defineProps<Props>();

const token = toRef(props, 'token');

const formData = reactive<AuthChangePasswordForm>({
  password: '',
  password_confirmation: '',
});

provide(AuthChangePasswordFormType, formData);

const messageErrors = ref<MessageErrors | string>('');
const isLoading = ref<boolean>(false);

const { changePassword, redirectLogin } = useAuth();

const submitResetPassword = async (): Promise<void> => {
  messageErrors.value = '';
  isLoading.value = true;
  const resp: void | boolean | string | string[] = await changePassword(formData, token.value);

  if (resp === true) {
    messageErrors.value = '';
    redirectLogin();
  } else {
    messageErrors.value = resp as string;
  }

  isLoading.value = false;
};
</script>

<template>
  <AuthLayout :isLoading="isLoading">
    <template #card-content>
      <AuthResetPasswordForm @submitForm="submitResetPassword()" :messageErrors="messageErrors"
        :isShowMessageErrors="!!messageErrors" />
    </template>
  </AuthLayout>
</template>

<style lang="sass" scoped></style>