<template>
  <!-- <div> -->

    <div id="app">
      <Navbar></Navbar>
      <router-view/>
      <footer class="has-text-centered" id="stickyfooter">
        <span style="font-size:1.25rem;">Stay updated on the latest posts from us.</span>&nbsp;&nbsp;<input type="text" id="emailSubscribe" style="min-width: 10rem;height: 1.7rem;font-size: 1rem;margin-top: 0.3rem; background-color: transparent; padding-left:0.3rem;border: 1px solid #24D17D; outline: none;margin-right: -0.3rem;" placeholder="email address">
        <button class="button is-success is-small" style="height: 1.7rem;margin-top: 0.3rem;" onclick="subscribed();">Subscribe</button>
      </footer>
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
    mounted: function( ) {
      const visibleList = /\/post\/|\/blog/;
      const currentPath = this.$router.history.current.fullPath;
      if(visibleList.test(currentPath)) {
        document.getElementById('stickyfooter').style.visibility = "visible";
      }
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