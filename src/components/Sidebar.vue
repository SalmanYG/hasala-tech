<template>
  <div class="sidebar">
      <h2>{{ username }}</h2>
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
    padding: 20px 0;
    background-color: lightblue;
}
.signout {

}
</style>