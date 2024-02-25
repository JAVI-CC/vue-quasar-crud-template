<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import MenuSideList from './MenuSideList.vue'
import HeaderButtonAvatarMenu from './HeaderPrincipal/HeaderButtonAvatarMenu.vue';
import HeaderButtonTranslateMenu from './HeaderPrincipal/HeaderButtonTranslateMenu.vue';

const $q = useQuasar();
const leftDrawerOpen = ref<boolean>(true);

onBeforeMount(() => {
  if ($q.screen.width <= 600) leftDrawerOpen.value = false;
})
</script>

<template>
  <q-header class="bg-white shadow-custom text-dark q-py-sm q-mt-md q-mx-lg">
    <q-toolbar>
      <q-btn dense flat round icon="mdi-menu" color="grey" @click="leftDrawerOpen = !leftDrawerOpen" />
      <q-toolbar-title></q-toolbar-title>
      <HeaderButtonTranslateMenu />
      <div class="q-mr-md"></div>
      <HeaderButtonAvatarMenu />
    </q-toolbar>
  </q-header>
  <MenuSideList :drawer="leftDrawerOpen" @updateDrawer="(val) => leftDrawerOpen = val" />
</template>

<style lang="sass" scoped></style>