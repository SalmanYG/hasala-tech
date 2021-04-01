<template>
  <router-view />
</template>

<script>
import { auth } from "./firebase/config";
import { ref } from 'vue';
export default {
  setup() {
    const user = ref(auth.currentUser);

    auth.onAuthStateChanged((newUser) => {
      user.value = newUser;
    })

    $("#sidebar").mCustomScrollbar({
      theme: "minimal"
    })
  }
}
</script>

<style>
html {
  min-height: 100%;
}
body {
  margin: 0;
  padding: 60px 0 17px;
}

@media (max-width: 979px) {
  body {
    padding: 0;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  padding-left: calc(100vw - 100%)
}
</style>
