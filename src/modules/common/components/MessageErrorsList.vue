<script setup lang="ts">
import { toRef } from 'vue';
import type { MessageErrors } from '../interfaces/commonInterface';

interface Props {
  messageErrors?: MessageErrors | string;
  isShow?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  messageErrors: '',
  isShow: false,
});

const messageErrors = toRef(props, 'messageErrors');
const isShow = toRef(props, 'isShow');
</script>

<template>
  <div v-if="isShow" class="text-left text-negative">
    <template v-if="typeof messageErrors === 'string'">
      <div>{{ messageErrors }}</div>
    </template>

    <template v-else>
      <template v-for="(value, name) in messageErrors" :key="name">
        <div v-for="message in value" :key="message">{{ message }}</div>
      </template>
    </template>
  </div>
</template>

<style lang="sass" scoped></style>
