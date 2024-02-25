<script setup lang="ts">
import { ref, toRef, computed } from 'vue';
import MenuSideTitle from './MenuSideList/MenuSideTitle.vue'
import MenuSideItems from './MenuSideList/MenuSideItems.vue'
import MenuSideItemGitHub from './MenuSideList/MenuSideItemGitHub.vue';
import MenuSideButtonDrawer from './MenuSideList/MenuSideButtonDrawer.vue';
import MenuSideImageDrawerMini from './MenuSideList/MenuSideImageDrawerMini.vue'
import { WritableComputedRef } from 'vue';

const emit = defineEmits<{
  updateDrawer: [val: boolean];
}>();

interface Props {
  drawer: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  drawer: false,
});

const drawer = toRef(props, 'drawer');
const miniState = ref<boolean>(false);

const onDrawerClick = (): void => {
  if (miniState.value) miniState.value = false;
}

interface FormData {
  drawer: WritableComputedRef<boolean>;
}

const formData = ref<FormData>({
  drawer: computed({
    get() {
      return drawer.value;
    },
    set(val) {
      emit('updateDrawer', val);
    },
  }),
});
</script>

<template>
  <q-drawer v-model="formData.drawer" show-if-above :mini="!drawer || miniState" @click.capture="onDrawerClick()"
    :width="280" :breakpoint="600" :mini-width="80" class="bg-white">
    <q-scroll-area class="fit">
      <MenuSideTitle v-if="!miniState" />
      <q-list class="rounded-borders text-grey-7 q-mx-md">
        <MenuSideImageDrawerMini v-if="miniState" />
        <MenuSideItems />
        <q-separator spaced />
        <MenuSideItemGitHub />
      </q-list>
    </q-scroll-area>

    <MenuSideButtonDrawer @click="miniState = true" />
  </q-drawer>
</template>

<style lang="sass" scoped></style>