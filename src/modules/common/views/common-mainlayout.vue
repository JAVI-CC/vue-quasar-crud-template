<template>
  <q-layout view="lHh lpr lFf">
    Header principal
    <div class="q-pb-xl bg-white">
      <router-view v-slot="{ Component, route }">
        <KeepAlive :exclude="excludeViews">
          <component :is="Component" :key="route.name" />
        </KeepAlive>
      </router-view>
    </div>
    Footer principal
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { instanceNotifications, pusherConfig } from '../services/laravelEchoPusher';
import useAuth from 'src/modules/auth/composables/useAuth';

const excludeViews = ref<string[]>(['user-edit', 'auth-password']);
const { isLogged } = useAuth();

onBeforeMount(() => {
  if (isLogged.value) instanceNotifications();
});

watch(
  () => isLogged.value,
  async (val) => {
    val ? instanceNotifications() : pusherConfig?.disconnect();
  }
);
</script>

<style lang="sass" scoped></style>
