<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  html, body {
    margin: 0px;
    padding: 0px;
    min-height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  input[type=text]::-webkit-input-placeholder {
    color: #cadced;
  }

  input[type=text]::-moz-placeholder {
    color: #cadced;
  }

  input[type=text]:-ms-input-placeholder {
    color: #cadced;
  }
</style>
