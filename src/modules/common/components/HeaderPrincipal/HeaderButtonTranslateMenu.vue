<script setup lang="ts">
import { LocalStorage, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

const $q = useQuasar()
const { locale } = useI18n({ useScope: 'global' });
const langList = import.meta.glob('/node_modules/quasar/lang/*.js');

const updateLanguage = (setLang: 'es' | 'en' | 'en-US'): void => {
  LocalStorage.set('language', setLang);
  if (setLang === 'en') setLang = 'en-US';

  // dynamic import, so loading on demand only
  langList[`/node_modules/quasar/lang/${setLang}.js`]()
    .then(lang => {
      $q.lang.set(lang.default)
      setLang === 'en-US' ? locale.value = 'en' : locale.value = setLang;
    })
}
</script>

<template>
  <q-btn unelevated round class="text-blue-grey-6" icon="mdi-translate-variant">
    <q-menu :offset="[55, -10]" style="border-radius: 20px;">
      <q-list class="text-center text-grey-10" style="min-width: 75px;">
        <q-item clickable v-close-popup :class="LocalStorage.getItem('language') === 'es' ? 'bg-selected' : ''"
          @click="updateLanguage('es')">
          <q-item-section>{{ $t('Spanish') }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup :class="LocalStorage.getItem('language') === 'en' ? 'bg-selected' : ''"
          @click="updateLanguage('en')">
          <q-item-section>{{ $t('English') }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style lang="sass" scoped></style>