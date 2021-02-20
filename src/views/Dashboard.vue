<template>
<div class="dashboard">
    <div class="wrapper">
        <Navbar @signout="redirect"/>
        <div class="main">
            <Main @spendingsModal="spendingsModal" @balanceModal="balanceModal" @walletModal = "walletModal" />
        </div>
    </div>
  </div>

  <div v-if="showModal&&showBalanceModal">
    <Modal title="balance" @close="toggleModal" />
  </div>

  <div v-if="showModal&&showSpendingsModal">
    <Modal title="spendings" @close="toggleModal" />
  </div>


  <div v-if="showModal&&showWalletModal">
    <Modal title="wallet" @close="toggleModal" />
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
    const showBalanceModal = ref(false);
    const showSpendingsModal = ref(false);
     const showWalletModal = ref(false);
    const heading = ref("ddds");
    const text = ref("dsdsds")

    const router = useRouter();
    const redirect = () => {
      router.push("/");
    };

    const balanceModal = () => {
      showModal.value = true;
      showBalanceModal.value = true;
    };

    const spendingsModal = () => {
    
      
      showModal.value = true;
      showSpendingsModal.value = true;
    };


    const walletModal = () =>{
       showModal.value = true
      showWalletModal.value = true
    }
    const toggleModal = () => {
      showModal.value = false;
      showSpendingsModal.value = false
      showBalanceModal.value = false
       showWalletModal.value = false
    };

    return {
      showBalanceModal,
      showSpendingsModal,
      showWalletModal,
      toggleModal,
      showModal,
      balanceModal,
      spendingsModal,
      walletModal,
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
  padding: 0;
}
.main {
    padding: 0 250px;
}
body {
  text-align: left;
}
</style>