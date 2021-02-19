<template>
  <div v-if="registered">
    <h2>Login</h2>
    <LoginForm @login="redirectToDashboard" />
    <p>
      Don't have an account? <span @click="registered = false">Sign up</span>
    </p>
  </div>

  <div v-else>
    <h2>Signup</h2>
    <SignupForm @sucessfulSignup="redirectToLogin" />
    <p>
      Already have an account? <span @click="registered = true">Login</span>
    </p>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    SignupForm,
    LoginForm,
  },
  setup() {
    const router = useRouter();
    const registered = ref(true);

    const redirectToDashboard = () => {
      router.push("/dashboard");
    };

    const redirectToLogin = () => {
      registered.value = true;
    };

    return { redirectToLogin, registered, redirectToDashboard };
  },
};
</script>

<style>
span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style>
