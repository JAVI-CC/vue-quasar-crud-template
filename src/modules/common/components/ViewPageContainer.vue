<script setup lang="ts"></script>

<template>
  <q-page-container>
    <q-page class="q-pa-lg row no-wrap">
      <div class="col">
        <div class="full-height">
          <q-scroll-area class="fit full-height">
            <slot name="content"></slot>
          </q-scroll-area>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<style lang="sass" scoped></style>