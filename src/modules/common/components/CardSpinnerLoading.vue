<script setup lang="ts">
import { toRef } from 'vue';

interface Props {
  isLoading?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  label: '',
});

const isLoading = toRef(props, 'isLoading');
const label = toRef(props, 'label');
</script>

<template>
  <q-inner-loading
    :showing="isLoading"
    size="50px"
    color="primary"
    :label="label"
    label-class="text-primary text-weight-bold"
    label-style="font-size: 1.1em"
  >
  </q-inner-loading>
</template>

<style lang="sass" scoped></style>
