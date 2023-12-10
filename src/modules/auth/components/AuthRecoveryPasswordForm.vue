<script setup lang="ts">
import { toRef } from 'vue';
import AuthButtonSubmit from './AuthButtonSubmit.vue'
import AuthRecoveryPasswordFormFieldEmail from './AuthRecoveryPasswordForm/AuthRecoveryPasswordFormFieldEmail.vue';
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
const { redirectLogin } = useAuth();
</script>

<template>
  <div class="text-blue-grey-6 text-body2 q-mb-lg">
    {{ $t('Enter your account email and we will send you a link to reset your password') }}.
  </div>

  <q-form @submit.prevent="$emit('submitForm')">
    <div class="text-grey-8 text-body2 q-mb-sm">{{ $t('Email').toUpperCase() }}</div>
    <AuthRecoveryPasswordFormFieldEmail />

    <div class="q-mb-md">
      <MessageErrorsList :isShow="isShowMessageErrors" :messageErrors="messageErrors" />
    </div>

    <AuthButtonSubmit label="Recover password" />

    <div class="text-center">
      <q-btn flat class="q-mt-lg full-width" dense no-caps padding="sm" color="primary" @click="redirectLogin()"
        :label="$t('Return to log')" />
    </div>
  </q-form>
</template>

<style lang="sass" scoped></style>