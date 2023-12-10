<script setup lang="ts">
import { toRef, ref, readonly } from 'vue';
import AuthResetPasswordFormFieldPassword from './AuthResetPasswordForm/AuthResetPasswordFormFieldPassword.vue';
import AuthResetPasswordFormFieldPasswordConfirm from './AuthResetPasswordForm/AuthResetPasswordFormFieldPasswordConfirm.vue';
import AuthButtonSubmit from './AuthButtonSubmit.vue';
import { MessageErrors } from 'src/modules/common/interfaces/commonInterface';
import MessageErrorsList from 'src/modules/common/components/MessageErrorsList.vue';

defineEmits<{
  submitForm: [void];
}>();

interface Props {
  isShowMessageErrors?: boolean;
  messageErrors?: string | MessageErrors;
}

const props = withDefaults(defineProps<Props>(), {
  isShowMessageErrors: false,
});

const isShowMessageErrors = toRef(props, 'isShowMessageErrors');
const messageErrors = toRef(props, 'messageErrors');
const messageText = readonly(ref<string>('Change you password to another that contains a minimum of 8 characters between uppercase letters, lowercase letters, numbers and symbols'));
</script>

<template>
  <div class="text-h6 text-blue-grey-6 q-mb-xs">
    {{ $t('Change password') }}
  </div>
  <div class="text-blue-grey-6 text-body2 q-mb-lg">{{ $t(messageText) + ' (.+-_!@#%^()&$*).' }}</div>

  <q-form @submit.prevent="$emit('submitForm')">
    <div class="text-grey-8 text-body2 q-mb-sm">{{ $t('Password').toUpperCase() }}</div>
    <AuthResetPasswordFormFieldPassword />

    <div class="text-grey-8 text-body2 q-mb-sm">{{ $t('Confirm password').toUpperCase() }}</div>
    <AuthResetPasswordFormFieldPasswordConfirm />

    <div class="q-mb-md">
      <MessageErrorsList :isShow="isShowMessageErrors" :messageErrors="messageErrors" />
    </div>

    <AuthButtonSubmit label="Change password" />
  </q-form>
</template>

<style lang="sass" scoped></style>