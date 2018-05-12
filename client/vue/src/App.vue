<template>
  <div>
    <Navbar></Navbar>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import NewMenuModal from '@/components/NewMenuModal'
import Landing from '@/components/Landing'

export default {
  data() {
    return {

    }
  },
  name: 'App',
  components: {
    Navbar, NewMenuModal, Landing
  },
  methods: {

  }
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
