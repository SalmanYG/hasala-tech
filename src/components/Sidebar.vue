<template>
  <div class="sidebar">
      <h2>{{ displayName }}</h2>

   
      <a @click.prevent = "handleSignOut" href="" >Sign out</a>
  </div>
</template>

<script>
import { ref } from 'vue'
import useSignOut from "../composables/signout"
import getUser from "../composables/getUser"
export default {
  
    setup(props, context) {
        const {user} = getUser()
     
        
        const displayName = user.value.displayName
  console.log(displayName);
  
const {error, signOut} = useSignOut()

const handleSignOut = async () =>{
    await signOut()

    if(!error.value){
  context.emit("signout")
}
}

        return { displayName,error,handleSignOut }
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