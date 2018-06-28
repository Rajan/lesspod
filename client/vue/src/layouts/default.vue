
<template>
  <div>
    <app-header></app-header>
    <nuxt/>
    <!-- <div id="content-wrapper" class="mui--text-center">
      <nuxt class="mui-container"/>
    </div> -->
    <!-- <app-footer></app-footer> -->
  </div>
</template>

<script>
  // import AppFooter from '@/components/Footer'
  import AppHeader from '@/components/Header'
  export default {
    components: { AppHeader },
    methods: {
      reloadPage () {
        window.location.reload()
      }
    }
  }
</script>

<style>
  #app-wrapper {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
</style>