<template>
  <form @submit.prevent="handleSubmit">

    <input required type="email" placeholder="Email" />
    <input required type="password" placeholder="Password" />
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const email = ref("");
    const password = ref("");

const handleSubmit = () =>{
    
}

  return {email,password,handleSubmit}
  
  }
};
</script>

<style>
</style>