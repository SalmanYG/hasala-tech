<template>
  <div class="dashboard">
    <div class="wrapper">
      <Navbar @signout="redirect" />
      <div class="main">
        <Main
          @spendingsModal="spendingsModal"
          @balanceModal="balanceModal"
          @addWalletModal="addWalletModal"
          @edit="editWallet"
        />
      </div>
    </div>
  </div>
  <div v-if="showModal && showWalletModal">
    <WalletModal @close="toggleModal" />
  </div>

  <div v-if="showModal && showBalanceModal">
    <Modal title="balance" @close="toggleModal" />
  </div>

  <div v-if="showModal && showSpendingsModal">
    <Modal title="spendings" @close="toggleModal" />
  </div>

  <div v-if="showModal && showAddWallet">
    <Modal title="wallet" @close="toggleModal" />
  </div>

  <Modal />
</template>

<script>
import { ref } from "vue";

import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import WalletModal from "../components/WalletModal";
import { useRouter } from "vue-router";
import getFromCollection from "../composables/getFromCollection";

export default {
  components: {
    Main,
    Navbar,
    Modal,
    WalletModal,
  },
  setup(props) {
    const showModal = ref(false);
    const showBalanceModal = ref(false);
    const showSpendingsModal = ref(false);
    const showAddWallet = ref(false);
    const showWalletModal = ref(false);
    const heading = ref("");
    const text = ref("");

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

    const addWalletModal = () => {
      showModal.value = true;
      showAddWallet.value = true;
    };
    const editWallet = () => {
      showModal.value = true;
      showWalletModal.value = true;
    };
    const toggleModal = () => {
      
      showModal.value = false;
      showSpendingsModal.value = false;
      showBalanceModal.value = false;
      showAddWallet.value = false;
      showWalletModal.value = false;
    };

    return {
      showBalanceModal,
      showSpendingsModal,
      showAddWallet,
      showWalletModal,
      toggleModal,
      showModal,
      editWallet,
      balanceModal,
      spendingsModal,
      addWalletModal,
      heading,
      text,
      redirect,
    };
  },
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
