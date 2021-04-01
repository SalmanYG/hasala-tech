<template>
  <nav class="navbar fixed-top">
    <div class="container">
      <div class="logo"><h2 translate="no">HasalaTech</h2></div>
      <form class="content">
        <label
          >Hello, <strong>{{ displayName }}</strong></label
        >
        <button @click.prevent="handleSignOut" class="btn btn-danger">
          Sign Out
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import useSignOut from "../composables/signout";
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
            if(displayName.value !== null) {
              document.title = displayName.value + "'s Dashboard"
            }
          }
        });
    });

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
  background-color: #048db6;
  color: white;
}

.container {
  padding-right: 0;
}
.btn {
  margin: 0 10px;
}
</style>
