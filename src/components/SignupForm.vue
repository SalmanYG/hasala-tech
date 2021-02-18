<template>
  <form @submit.prevent="handleSubmit">
    <input required type="text" placeholder="Display Name" />
    <input required type="email" placeholder="Email" />
    <input required type="password" placeholder="Password" />
    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

const handleSubmit = () =>{
    
}
  return {displayName,email,password,handleSubmit}
  }
};
</script>

<style>
</style>