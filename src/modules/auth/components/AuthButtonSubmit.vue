<script setup lang="ts">
import { toRef } from 'vue';

interface Props {
  label: string;
}
const props = defineProps<Props>();

const label = toRef(props, 'label');
</script>

<template>
  <q-btn color="light-blue-8" type="submit" class="full-width" :label="$t(label)" />
</template>

<style lang="sass" scoped></style>