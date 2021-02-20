<template>
  <router-view />
</template>

<script>
export default {
  setup() {
    $("#sidebar").mCustomScrollbar({
      theme: "minimal"
    })
  }
}
</script>

<style>
body {
  margin: 0;
  
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;

}
</style>
