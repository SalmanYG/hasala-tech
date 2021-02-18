<template>
  <div class="sidebar">
      <h2>{{ username }}</h2>
      <router-link class="signout" :to="{ name: 'Home' }">Sign out</router-link>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: ['uname'],
    setup(props) {
        const username = ref('')
        username.value = props.uname

        return { username }
    }
}
</script>

<style>
.sidebar {
    height: 100%;
    width: 180px;
    position: fixed;
    padding: 20px 0;
    background-color: lightblue;
    display: flex;
    flex-direction: column;
}
.signout {
    
}
</style>