<template>
  <div class="div-background height-100vh">
    <div class="flex justify-center items-center height-100vh">
      <q-card class="card-auth-layout q-pa-lg">
        <slot name="card-header"></slot>
        <q-toolbar class="text-blue-grey-6 q-my-md">
          <q-toolbar-title class="font-size-25 text-weight-medium">
            <q-avatar size="40px">
              <q-img no-spinner src="/images/logo.png" class="img-auth-logo" />
            </q-avatar>
            Quasar Framework Template
          </q-toolbar-title>
        </q-toolbar>
        <slot name="card-content"></slot>

        <div class="text-center">
          <q-btn flat class="q-mt-xl q-mb-xs full-width" icon="mdi-github" dense no-caps padding="sm" color="dark"
            label="GitHub" href="https://github.com/JAVI-CC/vue-quasar-crud-template" target="_blank" />
        </div>
        <CardSpinnerLoading :isLoading="isLoading" :label="labelLoading" />
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import CardSpinnerLoading from 'src/modules/common/components/CardSpinnerLoading.vue';

interface Props {
  isLoading?: boolean;
  labelLoading?: string;
}
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  labelLoading: '',
});

const isLoading = toRef(props, 'isLoading');
const labelLoading = toRef(props, 'labelLoading');
</script>

<style lang="sass" scoped>
.div-background
  background: linear-gradient(90deg,#f3f3f7 21px,#0000 1%) 50%,linear-gradient(#f3f3f7 21px,#0000 1%) 50%,#696cff
  background-size: 23px 23px

.height-100vh
  height: 100vh

.card-auth-layout
  width: 450px
  
@media (max-width: 500px)
  .card-auth-layout
    width: 90%

</style>
