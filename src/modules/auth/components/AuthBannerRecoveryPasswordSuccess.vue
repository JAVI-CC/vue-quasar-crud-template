<script setup lang="ts">
import { toRef } from 'vue';

defineEmits<{
  close: [void];
}>();

interface Props {
  isShow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isShow: false,
});

const isShow = toRef(props, 'isShow');
</script>

<template>
  <q-banner v-if="isShow" inline-actions class="my-banner bg-positive" dense>
    <div class="text-white" style="font-size: 13.5px;">
      {{ $t('In a few moments you will receive an email to reset your password. Check your mailbox') }}
    </div>
    <template #action>
      <q-btn flat dense color="white" rounded icon="mdi-close" @click="$emit('close')" />
    </template>
  </q-banner>
</template>

<style lang="sass" scoped>
.my-banner
  :deep(.q-banner__avatar)
    align-self: center
</style>