<template>
  <!-- <div> -->
    
    <div id="app">
      <Navbar></Navbar>
      <router-view/>
    <!-- </div> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import NewMenuModal from '@/components/NewMenuModal';
import axios from 'axios';

export default {
  data() {
    return {

    }
  },
  name: 'App',  
  components: {
    Navbar, NewMenuModal
  },
  methods: {

  },
  created: function(){
    document.getElementById("footer").style.visibility = "hidden";
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