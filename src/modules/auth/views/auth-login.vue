<script setup lang="ts">
import { ref, reactive, provide, toRef, onBeforeMount } from 'vue';
import AuthLayout from '../components/AuthLayout.vue';
import AuthLoginForm from '../components/AuthLoginForm.vue';
import type { LoginForm } from '../interfaces/authInterface';
import { MessageErrors } from 'src/modules/common/interfaces/commonInterface';
import useAuth from '../composables/useAuth';
import AuthBannerRecoveryPasswordSuccess from '../components/AuthBannerRecoveryPasswordSuccess.vue';
import { LoginFormType } from '../types/authType';

interface Props {
  emailRecoveryPassword: string;
}

const props = defineProps<Props>();

const emailRecoveryPassword = toRef(props, 'emailRecoveryPassword');

const formData = reactive<LoginForm>({
  email: 'admin@email.com',
  password: 'password',
});

provide(LoginFormType, formData);

const messageErrors = ref<MessageErrors | string>('');
const isLoading = ref<boolean>(false);
const isShowBanner = ref<boolean>(false);

const { isLogged, login } = useAuth();

onBeforeMount(async () => {
  if (!!emailRecoveryPassword.value) {
    formData.email = emailRecoveryPassword.value;
    isShowBanner.value = true;
  }
});

const submitLogin = async (): Promise<void> => {
  messageErrors.value = '';
  isLoading.value = true;
  const resp: void | string | string[] = await login(formData);
  if (!isLogged.value) messageErrors.value = resp as string;
  isLoading.value = false;
};
</script>

<template>
  <AuthLayout :isLoading="isLoading">
    <template #card-header>
      <AuthBannerRecoveryPasswordSuccess :isShow="isShowBanner" @close="isShowBanner = false" />
    </template>
    <template #card-content>
      <AuthLoginForm @submitForm="submitLogin()" :messageErrors="messageErrors" :isShowMessageErrors="!!messageErrors" />
    </template>
  </AuthLayout>
</template>

<style lang="sass" scoped></style>