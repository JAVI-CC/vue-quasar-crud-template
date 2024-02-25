<script setup lang="ts">
import useAuth from 'src/modules/auth/composables/useAuth';

const { userAuth, logout } = useAuth();
</script>

<template>
  <q-btn unelevated round>
    <q-avatar size="36px">
      <img :src="userAuth?.avatar_url">
    </q-avatar>
    <q-menu>
      <q-list style="min-width: 150px">
        <q-item disable clickable v-close-popup class="text-weight-bold">
          <q-item-section>
            <q-item-label lines="1">{{ userAuth?.nombre_completo }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup>
          <q-item-section>{{ $t('My profile') }}</q-item-section>
        </q-item>
        <q-item clickable v-close-popup exact :to="{ name: 'auth-password' }" exact-active-class="text-primary">
          <q-item-section>{{ $t('Change password') }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup @click="logout()">
          <q-item-section>{{ $t('Logout') }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style lang="sass" scoped></style>