<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: #f5f5f5;
}
</style>
