<script setup lang="ts">
import { ref, toRefs, inject } from 'vue';
import { messageRequired, messageMaxLength, messageMinLength, messageIncorrectFormat } from 'src/modules/common/helpers/messageRules';
import { AuthChangePasswordForm } from '../../interfaces/authInterface';
import { AuthChangePasswordFormType } from '../../types/authType';
import passwordFormatTest from 'src/modules/common/helpers/validatePasswordFormat';

const { password } = toRefs(inject(AuthChangePasswordFormType) as AuthChangePasswordForm);
const isShowPwd = ref<boolean>(false);
</script>

<template>
  <q-input class=" q-mb-md" dense outlined v-model="password" :label="$t('Enter a new password')" maxlength="255"
    :type="isShowPwd ? 'text' : 'password'" reactive-rules :rules="[
      $rules.required(messageRequired),
      $rules.minLength(8, messageMinLength(8)),
      $rules.maxLength(255, messageMaxLength(255)),
      (val) => passwordFormatTest(val) || messageIncorrectFormat,
    ]">
    <template #append>
      <q-icon :name="isShowPwd ? 'mdi-eye' : 'mdi-eye-off'" class="cursor-pointer" @click="isShowPwd = !isShowPwd" />
    </template>
  </q-input>
</template>

<style lang="sass" scoped></style>