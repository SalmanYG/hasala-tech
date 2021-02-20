<template>
<div class="dashboard">
    <div class="wrapper">
        <Navbar @signout="redirect" @open="openSidebar"/>
        <div class="main">
            <Main @toggleModal ="toggleModal" />
        </div>
    </div>
  </div>

  <div v-if="showModal">
    <Modal  @close="toggleModal" />
  </div>


</template>

<script>
import { ref } from "vue";

import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { useRouter } from "vue-router";
export default {
  components: {
    Main,
    Navbar,
    Modal
  },
  setup(props) {
    const showModal = ref(false);
    const heading = ref("ddds");
    const text = ref("dsdsds")

    const router = useRouter();
    const redirect = () => {
      router.push("/");
    };

    const toggleModal = () => {
      showModal.value = !showModal.value;
      console.log(showModal.value);
    };

    return { heading, text, toggleModal, showModal, redirect };
  }
};
</script>

<style scoped>
.dashboard {
  margin: 0;
  padding: 0;
}
.main {
    padding: 0 250px;
}
</style>