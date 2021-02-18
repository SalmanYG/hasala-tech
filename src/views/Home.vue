<template>

<div v-if="registered">
      <h2>Login</h2>
    <LoginForm/>
    <p>Don't have an account? <span @click = "registered = false">Sign up</span> </p>

</div>

<div v-else>
  <h2>Signup</h2>
<SignupForm/>
  <p>Already have an account? <span @click = "registered = true">Login</span> </p>
</div>

</template>

<script>
import SignupForm from "../components/SignupForm"
import LoginForm from "../components/LoginForm"
import { ref } from 'vue'
export default {
components:{
SignupForm,LoginForm
},
setup(){
const registered = ref(true)

return {registered}
}
}
</script>

<style>
span {
     font-weight: bold;
       text-decoration: underline;
          cursor: pointer;
}


</style>
