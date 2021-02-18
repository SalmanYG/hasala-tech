<template>
  <div>fddd</div>
  <button @click = "handleSignOut">Signout</button>
</template>

<script>
import { ref } from "vue";
import useSignOut from "../composables/signout"
export default {
setup(){
       const {error, signOut} = useSignOut()
    const handleSignOut = async () =>{
 await signOut(email.value,password.value)
    }

    return {error,handleSignOut}
}
}
</script>

<style>

</style>