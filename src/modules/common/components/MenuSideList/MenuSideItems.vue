<script setup lang="ts">
import menuListOptions from '../../helpers/menuListOptions';
</script>

<template>
  <template v-for="{ label, icon, routerName } in menuListOptions" :key="routerName">
    <q-item clickable v-ripple class="q-mb-sm" exact :to="{ name: routerName }" exact-active-class="my-menu-link">
      <q-item-section avatar>
        <q-icon :name="icon" />
      </q-item-section>
      <q-item-section>{{ $t(label) }}</q-item-section>
    </q-item>
  </template>
</template>

<style lang="sass" scoped>
.my-menu-link
  background-color: #696cff29!important
  color: #696cff!important
  border-radius: 5px
</style>