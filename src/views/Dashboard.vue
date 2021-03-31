<template>
  <div class="dashboard">
    <div class="wrapper">
      <Navbar :displayName="displayName" @signout="redirect" />
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
  <!-- Edit Wallet -->
  <div v-if="showModal && showWalletModal">
    <WalletModal :wallet="wallet" @close="toggleModal" @edit="editWallet" />
  </div>

  <!-- Add Wallet -->
  <div v-if="showModal && showAddWallet">
    <Modal title="wallet" @close="toggleModal" />
  </div>

  <!-- Balance Modal -->
  <div v-if="showModal && showBalanceModal">
    <Modal title="balance" :wallet="wallet" @close="toggleModal" />
  </div>

  <!-- Spendings Modal -->
  <div v-if="showModal && showSpendingsModal">
    <Modal title="spendings" :wallet="wallet" @close="toggleModal" />
  </div>
</template>

<script>
import { ref } from "vue";

import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import WalletModal from "../components/WalletModal";
import { useRouter } from "vue-router";

export default {
  components: {
    Main,
    Navbar,
    Modal,
    WalletModal,
  },
  setup() {
    const showModal = ref(false);
    const showBalanceModal = ref(false);
    const showSpendingsModal = ref(false);
    const showAddWallet = ref(false);
    const showWalletModal = ref(false);
    const heading = ref("");
    const text = ref("");
    const wallet = ref({});

    const router = useRouter();
    const redirect = () => {
      router.push("/");
    };

    const balanceModal = (el) => {
      showModal.value = true;
      showBalanceModal.value = true;
      //named the variable 'el' due to an existing variable named wallet
      wallet.value = el
    };

    const spendingsModal = (el) => {
      showModal.value = true;
      showSpendingsModal.value = true;
      //named the variable 'el' due to an existing variable named wallet
      wallet.value = el
    };

    const addWalletModal = () => {
      showModal.value = true;
      showAddWallet.value = true;
    };
    const editWallet = (el) => {
      showModal.value = true;
      showWalletModal.value = true;
      //named the variable 'el' due to an existing variable named wallet
      wallet.value = el;
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
      wallet,
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
  padding: 0;
}
body {
  text-align: left;
}
</style>
