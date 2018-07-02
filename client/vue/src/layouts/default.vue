
<template>
  <div id="app">
    <app-header></app-header>
    <nuxt/>
  </div>
</template>

<script>
  import AppHeader from '@/components/Header';

  export default {
    components: { AppHeader},
    methods: {
      reloadPage () {
        window.location.reload()
      }
    }
  };
</script>

<style>
  #app-wrapper {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
</style>