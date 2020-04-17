<template>
  <div id="app">
    <floating-card class="">
      <template v-slot:main>
        <div class="content"></div>
      </template>
      <template v-slot:floating>
        <div class="floating"></div>
      </template>
    </floating-card>
  </div>
</template>

<script>
  import FloatingCard from './FloatingCard';

  export default {
    name: 'App',
    components: {
      FloatingCard,
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    padding: 100px 60px 400px;
  }

  .content {
    height: 2500px;
    background-color: grey;
  }

  .floating {
    height: 250px;
    background-color: lightsalmon;
    margin-left: 20px;
    border-radius: 8px;
  }
</style>
