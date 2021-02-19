<template>
  <div class="dashboard container">
    <div class="row">
      <div class="sidebar col-2">
        <Sidebar @signout="redirect" />
      </div>

      <div class="main col-10">
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
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { useRouter } from "vue-router";
export default {
  components: {
    Main,
    Sidebar,
    Modal
  },
  setup(props) {
    const showModal = ref(false);
    const heading = ref("ddds");
    const text = ref("dsdsds");
    const router = useRouter();
    const redirect = () => {
      router.push("/");
    };

    const toggleModal = () => {
      showModal.value = !showModal.value;
      console.log(showModal.value);
    };

    console.log(showModal.value);
    return { heading, text, toggleModal, showModal, redirect };
  }
};
</script>

<style scoped>
.dashboard {
  margin: 0;
}
</style>