<script setup lang="ts">
import { inject, toRef } from 'vue';
import { messageRequired, messageEmail, messageMaxLength } from 'src/modules/common/helpers/messageRules';
import { RecoveryPasswordType } from '../../types/authType';

const email = toRef(inject(RecoveryPasswordType) as string);
</script>

<template>
  <q-input class="q-mb-md" dense outlined v-model="email" :label="$t('Enter your email')" maxlength="255" reactive-rules
    :rules="[
      $rules.required(messageRequired),
      $rules.email(messageEmail),
      $rules.maxLength(255, messageMaxLength(255)),
    ]" />
</template>

<style lang="sass" scoped></style>