<template>
  <div class="dashboard container">
    <div class="row">
      <div class="sidebar col-2">
        <Sidebar @signout="redirect" />
      </div>

      <div class="main col-10">
        <Main @spendingsModal="spendingsModal" @balanceModal="balanceModal" />
      </div>
    </div>
  </div>

  <div v-if="showModal&&showBalanceModal">
    <Modal title="balance" @close="toggleModal" />
  </div>

  <div v-if="showModal&&showSpendingsModal">
    <Modal title="spendings" @close="toggleModal" />
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
    const showBalanceModal = ref(false);
    const showSpendingsModal = ref(false);
    const heading = ref("ddds");
    const text = ref("dsdsds");
    const router = useRouter();
    const redirect = () => {
      router.push("/");
    };

    const balanceModal = () => {
      showModal.value = true;
      showBalanceModal.value = true;
    };

    const spendingsModal = () => {
      console.log(696969);
      
      showModal.value = true;
      showSpendingsModal.value = true;
    };

    const averageModal = () => {
      showModal.value = true;
     // showBalanceModal.value = true;
    };
    const toggleModal = () => {
      showModal.value = false;
      showSpendingsModal.value = false
      showBalanceModal.value = false
    };

    return {
      showBalanceModal,
      showSpendingsModal,
      toggleModal,
      showModal,
      balanceModal,
      spendingsModal,
      heading,
      text,
      redirect
    };
  }
};
</script>

<style scoped>
.dashboard {
  margin: 0;
}
body {
  text-align: left;
}
</style>