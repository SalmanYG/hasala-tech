<template>
  <form @submit.prevent="handleSubmit">
    <input required type="text" placeholder="Display Name" v-model="displayName"/>
    <input required type="email" placeholder="Email" v-model="email"/>
    <input required type="password" placeholder="Password" v-model="password" />
    <button>Sign up</button>
    <p>{{error}}</p>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from '../composables/signup'
export default {
  setup() {
    const {error, signup} = useSignup()
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

const handleSubmit = async () =>{
    await signup(email.value,password.value)
}
  return {error,displayName,email,password,handleSubmit}
  }
};
</script>

<style>
</style>