<template>
  <div class="dashboard container">
    <div class="row">
      <div class="sidebar col-2">
        <Sidebar @signout="redirect" uname="salman" />
      </div>
      <div class="main col-10">
        <Main />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { useRouter } from "vue-router";
export default {
  components: {
    Main,
    Sidebar,
    Modal,
  },
  setup() {
    const showModal = ref(false);

    const router = useRouter();
    const redirect = () => {
      router.push("/");
    };

    const toggleModal = () => {
      showModal.value = !showModal.value;
      console.log(showModal.value);
    };

    console.log(showModal.value);
    return { toggleModal, showModal, redirect };
  },
};
</script>

<style scoped>
.dashboard {
  margin: 0;
}
</style>