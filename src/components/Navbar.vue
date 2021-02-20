<template>
  <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
          <div class="logo"><h2>HasalaTech</h2></div>
          <form class="content">
              <label>Hello, <strong>{{ displayName }}</strong></label>
              <button @click.prevent="handleSignOut" class="btn btn-outline-danger">Sign Out</button>
          </form>
      </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import useSignOut from "../composables/signout";
import getUser from "../composables/getUser";

export default {
    props: ['show'],
    setup(props, context) {
        const { user } = getUser();
        
        const displayName = user.value.displayName;
        console.log(displayName);

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
.navbar {
    padding: 10px 250px;
}
.btn {
    margin: 0 10px;
}
</style>