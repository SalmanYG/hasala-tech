<template>
  <div class="sidebar">
    <h2>{{ displayName }}</h2>

    <a class="nav-link" @click.prevent="handleSignOut">Sign out</a>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignOut from "../composables/signout";
import getUser from "../composables/getUser";

export default {
  setup(props, context) {
    const { user } = getUser();

    const displayName = user.value.displayName;
    console.log(displayName);

    const { error, signOut } = useSignOut();

    const handleSignOut = async () => {
      await signOut();

      if (!error.value) {
        context.emit("signout");
      }
    };

    return { displayName, error, handleSignOut };
  }
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  padding: 20px 0;
  background-color: lightblue;
  text-align: center;
}

a {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
}
</style>