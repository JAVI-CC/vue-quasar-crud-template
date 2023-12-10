<script setup lang="ts">
import { toRef } from 'vue';
import AuthButtonSubmit from './AuthButtonSubmit.vue'
import AuthLoginFormFieldEmail from './AuthLoginForm/AuthLoginFormFieldEmail.vue';
import AuthLoginFormFieldPassword from './AuthLoginForm/AuthLoginFormFieldPassword.vue';
import { MessageErrors } from 'src/modules/common/interfaces/commonInterface';
import MessageErrorsList from 'src/modules/common/components/MessageErrorsList.vue';
import useAuth from '../composables/useAuth';

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
const { redirectRecoveryPassword } = useAuth();
</script>

<template>
  <div class="text-h6 text-blue-grey-6 q-mb-xs">{{ $t('Welcome to Quasar Framework Template') }}!</div>
  <div class="text-blue-grey-6 text-body2 q-mb-lg">{{ $t('Please sign-in to your account') }}.</div>

  <q-form @submit.prevent="$emit('submitForm')">
    <div class="text-grey-8 text-body2 q-mb-sm">{{ $t('Email').toUpperCase() }}</div>
    <AuthLoginFormFieldEmail />

    <div class="text-grey-8 text-body2 q-mb-sm">{{ $t('Password').toUpperCase() }}</div>
    <AuthLoginFormFieldPassword />

    <div class="q-mb-md">
      <MessageErrorsList :isShow="isShowMessageErrors" :messageErrors="messageErrors" />
    </div>

    <div class="text-right">
      <q-btn flat class="q-mb-md" dense no-caps padding="none" color="primary" @click="redirectRecoveryPassword()"
        :label="$t('Forgot password?')" />
    </div>
    <AuthButtonSubmit label="Sign in" />
  </q-form>
</template>

<style lang="sass" scoped></style>