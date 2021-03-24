<template>

  <div v-if="registered">
   
    <LoginForm @login="redirectToDashboard" :signupSuccess="signedUp"/>
     
    <a class="nav-link" @click="resetValues" >Create an Account!</a>
  </div>

  <div v-else>
   
    <SignupForm @sucessfulSignup="redirectToLogin" />
        <a class="nav-link" @click="resetValues" >Login</a>
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
    const signedUp = ref(false)

    const redirectToDashboard = () => {
      router.push({ name: "Dashboard"});
    };

    const redirectToLogin = (val) => {
      registered.value = true;
      signedUp.value = val
    };

    const resetValues = () => {
      registered.value = !registered.value
      signedUp.value = false
    }

    return { redirectToLogin, registered, redirectToDashboard, signedUp, resetValues };
  },
};
</script>

<style scoped>
a {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
    text-align: center;

}


</style>
