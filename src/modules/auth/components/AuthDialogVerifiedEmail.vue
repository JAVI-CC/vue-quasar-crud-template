<script setup lang="ts">
import { computed, ref } from 'vue';
import useAuth from '../composables/useAuth';
import AuthBannerVerifiedEmailSuccess from './AuthBannerVerifiedEmailSuccess.vue';
import AuthBannerVerifiedEmailFailded from './AuthBannerVerifiedEmailFailed.vue';
import { MessageErrors } from 'src/modules/common/interfaces/commonInterface';
import CardSpinnerLoading from 'src/modules/common/components/CardSpinnerLoading.vue';

const { isLogged, isEmailVerified, sendEmailVerification } = useAuth();
const isOpen = computed<boolean>(() => isLogged.value && !isEmailVerified.value);
const isShowBanner = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const messageErrors = ref<MessageErrors | string>('');

const onSendEmailVerification = async (): Promise<void> => {
  isLoading.value = true;

  isShowBanner.value = false;
  messageErrors.value = '';

  const resp: void | string | string[] | boolean = await sendEmailVerification();

  (resp === true) ? isShowBanner.value = true : messageErrors.value = resp as string;

  isLoading.value = false;
}
</script>

<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card class="q-py-lg q-px-lg">
      <AuthBannerVerifiedEmailSuccess :isShow="isShowBanner" @close="isShowBanner = false" />
      <AuthBannerVerifiedEmailFailded :isShow="!isShowBanner && !!messageErrors" :messageErrors="messageErrors"
        @close="messageErrors = ''" />
      <q-card-section>
        <div class="text-center">
          <div class="text-h5 text-weight-bold text-grey-8">{{ $t('Confirm you email') }}</div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-center">
          <div class="text-weight-medium text-grey-8 text-h6 q-mb-lg">
            {{ $t("Click the link in your email inbox to confirm your account") }}.
          </div>
          <div class="text-body1 q-mb-lg">
            {{ $t("Dont forget to check your spam folder in case anything is lost!") }}
          </div>
          <q-btn flat no-caps padding="none" class="text-primary text-body2" @click="onSendEmailVerification()"
            :label="$t('Resend confirmation email')" />
        </div>
      </q-card-section>
      <CardSpinnerLoading :isLoading="isLoading" />
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped></style>