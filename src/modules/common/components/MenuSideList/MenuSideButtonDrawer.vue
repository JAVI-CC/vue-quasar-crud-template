<script setup lang="ts">
defineEmits<{
  click: [void];
}>();
</script>

<template>
  <div class="q-mini-drawer-hide absolute" style="top: 32px; right: -17px">
    <q-btn dense round unelevated color="primary" padding="none" icon="mdi-chevron-left"
      style="border: 6px solid rgb(242, 242, 247);" @click="$emit('click')">
    </q-btn>
  </div>
</template>

<style lang="sass" scoped></style>