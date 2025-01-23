<template lang="pug">
AppProvider(:i18n="locales")
  router-view
</template>

<script setup lang="ts">
import locales from '@ownego/polaris-vue/dist/locales/en.json';
</script>

<style lang="scss">
@use '@/scss/app.scss';
</style>
