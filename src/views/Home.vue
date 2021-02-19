<template>
  <div v-if="registered">
   
    <LoginForm @login="redirectToDashboard" />
       <a class="small" @click="registered = false" >Create an Account!</a>
    
  </div>

  <div v-else>
   
    <SignupForm @sucessfulSignup="redirectToLogin" />
     <a class="small" @click="registered = true" >Login</a>
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
      router.push({ name: "Dashboard"});
    };

    const redirectToLogin = () => {
      registered.value = true;
    };

    return { redirectToLogin, registered, redirectToDashboard };
  },
};
</script>

<style>
a {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style>
