<script setup lang="ts">
import useAuth from 'src/modules/auth/composables/useAuth';

const { redirectInicio } = useAuth();
</script>

<template>
  <q-toolbar class="text-blue-grey-6 q-mt-lg q-mb-xs q-pl-lg cursor-pointer" @click="redirectInicio()">
    <q-toolbar-title class="text-weight-medium">
      <q-avatar size="38px">
        <q-img no-spinner src="/images/logo.png" class="q-mr-xs" />
      </q-avatar>
      Quasar Template
    </q-toolbar-title>
  </q-toolbar>
</template>

<style lang="sass" scoped></style>