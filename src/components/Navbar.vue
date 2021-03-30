<template>
  <nav class="navbar fixed-top navbar-light bg-light">
    <div class="container">
      <div class="logo"><h2>HasalaTech</h2></div>
      <form class="content">
        <label
          >Hello, <strong>{{ displayName }}</strong></label
        >
        <button @click.prevent="handleSignOut" class="btn btn-outline-danger">
          Sign Out
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeMount, onBeforeUpdate } from "vue";
import useSignOut from "../composables/signout";
import getUser from "../composables/getUserAuth";
import { auth } from "../firebase/config";

export default {
  props: ["show"],
  setup(props, context) {
    let displayName = ref("");
    
    // to get user before loading page
     const user = ref(auth.currentUser);
    onMounted(async () => {
     await auth.onAuthStateChanged((newUser) => {
        if (newUser) {
          user.value = newUser;
          displayName.value = user.value.displayName;
        }
      });
    });
console.log( displayName.value);

    const { error, signOut } = useSignOut();

    const handleSignOut = async () => {
      await signOut();

      if (!error.value) {
        context.emit("signout");
      }
    };

    return { displayName, error, handleSignOut };
  },
};
</script>

<style scoped>
.navbar {
  padding: 10px;
  padding-left: calc(100vw - 100%)
}
.btn {
  margin: 0 10px;
}
</style>
