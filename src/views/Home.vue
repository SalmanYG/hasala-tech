<template>
  <h1>HasalaTech</h1>
  <div v-if="registered">
   
    <LoginForm @login="redirectToDashboard" :signupSuccess="signedUp"/>
     
    <a class="nav-link" @click="resetValues" >Create an Account!</a>
  </div>

  <div v-else>
   
    <SignupForm @sucessfulSignup="redirectToLogin" />
        <a class="nav-link" @click="resetValues" >Login</a>
  </div>

  
  <div class="footer">
    <a href="https://github.com/SalmanYG">
      <img class="github" src="../assets/github.svg" alt="Github Account">
    </a>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { onMounted, ref, watch } from "vue";
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

    onMounted(() => {
      document.title = "Login"
    })

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
      if(registered.value) {
        document.title = "Login"
      }
      else {
        document.title = "Signup"
      }
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

h1 {
  text-align: center;
  margin-top: 25px;
  /* color: white; */
}

.footer {
  background-color: #004c6d;
  color: white;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4rem;
  padding: 1rem 0 2rem;
  margin: 0;
}

.github {
  width: 30px;
  height: 30px;
}

@media (max-width: 768px) {
  h1 {
    margin-top: 20%;
  }
}
</style>
