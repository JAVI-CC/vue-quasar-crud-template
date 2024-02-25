<script setup lang="ts">
import { onBeforeMount, ref, toRef, watch } from 'vue';
import { instanceNotifications, pusherConfig } from '../services/laravelEchoPusher';
import useAuth from 'src/modules/auth/composables/useAuth';
import AuthDialogVerifiedEmail from 'src/modules/auth/components/AuthDialogVerifiedEmail.vue';
import { AuthVerificationUser } from 'src/modules/auth/interfaces/authInterface';
import HeaderPrincipal from '../components/HeaderPrincipal.vue';
import ViewPageContainer from '../components/ViewPageContainer.vue';

interface Props {
  authVerification?: AuthVerificationUser;
}

const props = defineProps<Props>();

const authVerification = toRef(props, 'authVerification');

const excludeViews = ref<string[]>(['user-edit', 'auth-password']);
const { isLogged, verifyUserAuth } = useAuth();

onBeforeMount(async () => {
  if (isLogged.value) instanceNotifications();

  if (authVerification.value)
    await setTimeout(() => verifyUserAuth(authVerification.value as AuthVerificationUser), 1000);
});

watch(
  () => isLogged.value,
  async (val) => {
    val ? instanceNotifications() : pusherConfig?.disconnect();
  }
);
</script>

<template>
  <q-layout view="lHh lpr lFf" class="my-class-layout">
    <HeaderPrincipal />
    <AuthDialogVerifiedEmail />
    <router-view v-slot="{ Component, route }">
      <KeepAlive :exclude="excludeViews">
        <ViewPageContainer>
          <template #content>
            <component :is="Component" :key="route.name" />
          </template>
        </ViewPageContainer>
      </KeepAlive>
    </router-view>
  </q-layout>
</template>

<style lang="sass" scoped>
.my-class-layout
  :deep(div.q-drawer-container aside)
    position: fixed
</style>
