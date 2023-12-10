<script setup lang="ts">
import { ref, toRefs, inject } from 'vue';
import { messageRequired, messageMaxLength, messageMinLength } from 'src/modules/common/helpers/messageRules';
import { LoginForm } from '../../interfaces/authInterface';
import { LoginFormType } from '../../types/authType';

const { password } = toRefs(inject(LoginFormType) as LoginForm);
const isShowPwd = ref<boolean>(false);
</script>

<template>
  <q-input class=" q-mb-md" dense outlined v-model="password" :label="$t('Enter password')" maxlength="255"
    :type="isShowPwd ? 'text' : 'password'" reactive-rules :rules="[
      $rules.required(messageRequired),
      $rules.minLength(8, messageMinLength(8)),
      $rules.maxLength(255, messageMaxLength(255)),
    ]">
    <template #append>
      <q-icon :name="isShowPwd ? 'mdi-eye' : 'mdi-eye-off'" class="cursor-pointer" @click="isShowPwd = !isShowPwd" />
    </template>
  </q-input>
</template>

<style lang="sass" scoped></style>