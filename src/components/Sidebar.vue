<template>
  <div class="sidebar">
      <h2>{{ username }}</h2>
      <router-link  class="signout" :to="{ name: 'Home' }">Sign out</router-link>
   
      <a @click.prevent = "handleSignOut" href="" >Sign out</a>
  </div>
</template>

<script>
import { ref } from 'vue'
import useSignOut from "../composables/signout"
export default {
    props: ['uname'],
    setup(props, context) {
        const username = ref('')
        username.value = props.uname
const {error, signOut} = useSignOut()

const handleSignOut = async () =>{
    await signOut()

    if(!error.value){
  context.emit("signout")
}
}

        return { error,username,handleSignOut }
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