<template>
  <form @submit.prevent="handleSubmit">
    <input
      required
      type="text"
      placeholder="Display Name"
      v-model="displayName"
    />
    <input required type="email" placeholder="Email" v-model="email" />
    <input required type="password" placeholder="Password" v-model="password" />
    <button>Sign up</button>
    <p>{{ error }}</p>

    <div v-if="!error && submitted">
      <p>Sign up is succesful !</p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/signup";

export default {
  setup(props, context) {
    const { error, signup } = useSignup();
    console.log(error);

    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const submitted = ref(false);

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      submitted.value = true;
      if (!error.value) {
        context.emit("sucessfulSignup");
      }
    };
    return { submitted, error, displayName, email, password, handleSubmit };
  },
};
</script>

<style>
</style>