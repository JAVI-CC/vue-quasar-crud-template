<script setup lang="ts">
import { toRef } from 'vue';
import MessageErrorsList from 'src/modules/common/components/MessageErrorsList.vue';
import { MessageErrors } from 'src/modules/common/interfaces/commonInterface';

defineEmits<{
  close: [void];
}>();

interface Props {
  isShow?: boolean;
  messageErrors?: string | MessageErrors;
}

const props = withDefaults(defineProps<Props>(), {
  isShow: false,
});

const isShow = toRef(props, 'isShow');
const messageErrors = toRef(props, 'messageErrors');
</script>

<template>
  <q-banner v-if="isShow" inline-actions class="bg-grey-4" dense>
    <MessageErrorsList :isShow="isShow" :messageErrors="messageErrors" />
    <template #action>
      <q-btn flat dense color="white" rounded icon="mdi-close" @click="$emit('close')" />
    </template>
  </q-banner>
</template>

<style lang="sass" scoped>
</style>