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
  padding: 60px 0;
}

@media (max-width: 979px) {
  body {
    padding: 0px;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;

}
</style>
