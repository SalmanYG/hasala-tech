<template>
  <form @submit.prevent="handleSubmit">
    <input required type="email" placeholder="Email" v-model="email" />
    <input required type="password" placeholder="Password" v-model="password" />
    <button>Login</button>

    <p>{{ error }}</p>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/login";

export default {
  setup(props, context) {
    const { error, login } = useLogin();
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        context.emit("login");
      }
    };

    return { error, email, password, handleSubmit };
  },
};
</script>

<style>
</style>