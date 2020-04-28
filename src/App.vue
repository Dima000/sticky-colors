<template>
  <div id="app">
    <sticky-panel class="sticky-panel"
                  static-class="sticky-panel__static"
                  sticky-class="sticky-panel__sticky"
                  ref="stickyCard"
                  :gap-top="20">

      <template v-slot:static>
        <div class="static__inner"></div>
      </template>
      <template v-slot:sticky>
        <div class="sticky__inner"></div>
      </template>
    </sticky-panel>
    <div class="footer">
      <div class="footer_inner"></div>
    </div>
  </div>
</template>

<script>
  import StickyPanel from './StickyPanel';

  export default {
    name: 'App',
    components: {
      StickyPanel,
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    padding: 100px 60px 600px;
  }

  .sticky-panel {
    display: flex;

    &__static {
      flex: 5
    }

    &__sticky {
      flex: 3
    }
  }


  .static__inner {
    height: 2500px;
    background-color: grey;
  }

  .sticky__inner {
    height: calc(100vh - 30px);
    background-image: linear-gradient(rgb(123, 137, 140), rgb(146, 189, 184));
    margin-left: 20px;
    border-radius: 8px;
  }

  .footer {
    border: 1px dashed gray;
    height: 300px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(146, 189, 184);

    &_inner {
      background-color: #818e8e;
      width: 70%;
      height: 70%;
    }
  }
</style>
