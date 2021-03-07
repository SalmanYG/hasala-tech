<template>
  <div v-if="doc">
    <div class="container">
      <div class="cards row">
        <div class="col">
          <Card
            @balanceModal="balanceModal"
            title="Balance"
            :content="shownWallet.balance"
            :button="true"
          />
        </div>
        <div class="col">
          <Card
            @spendingsModal="spendingsModal"
            title="Spendings"
            :content="spendingsTotal"
            :button="true"
          />
        </div>
        <div class="col">
          <Card title="Average Spendings" :content="spendingsAvg" :button="false" />
        </div>
      </div>
      <div class="charts row">
        <div class="col-6">
          <LineChart :wallet="shownWallet"/>
        </div>
        <div class="col-6">
          <PieChart :wallet="shownWallet"/>
        </div>
      </div>
      <div class="wallets row">
        <div class="col">
          <WalletList
            @show="showWallet"
            @edit="editWallet"
            @addWalletModal="addWalletModal"
            :wallets="queryRes"
          />
        </div>
      </div>
    </div>
  </div>


  <Modal :wallet="shownWallet"/>

  <div class="overlay"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import Card from "./Card.vue";
import PieChart from "./PieChart.vue";
import LineChart from "./LineChart.vue";
import WalletList from "./WalletList.vue";
import Modal from "./Modal.vue";

import getUser from "../composables/getUserAuth";
import getFromCollection from "../composables/getFromCollection";
import docRef from "../composables/docRef";
import { auth } from "../firebase/config";

export default {
  components: {
    Card,
    PieChart,
    LineChart,
    WalletList,
    Modal
  },

  setup(props, context) {
    //variables and refs that aren't from composables
    const queryRes = ref([]);
    const shownWallet = ref({});
    let hasSorted = false

    const spendings = ref([])
    const spendingsTotal = ref(0)
    const spendingsAvg = ref(0)
    //for getting returned values from composables
    const { doc, getDoc } = getFromCollection("users"); //to get documents
    const { getRef, result } = docRef("users"); //to update single document
    const { getCollRef, collResult } = docRef("wallets"); //to query from a collection

    //to execute anything else (+ methods that require await)
    onMounted(async () => {
      const user = ref(auth.currentUser);
      let uid = "";

      await auth.onAuthStateChanged(async (newUser) => {
        if (newUser) {
          user.value = newUser;
          uid = user.value.uid;

          await getDoc(uid);
          await getCollRef();

          //cycle through wallets collection to find the user's wallets
          await collResult.value
            .where("users", "array-contains", uid)
            .onSnapshot((snap) => {
              let results = snap.docs.map((document) => {
                return { ...document.data(), id: document.id };
              });

              queryRes.value = results;

              //cycle through all wallets
              if(!hasSorted){
                //find default wallet (for the first time only)
                for (let i = 0; i < results.length; i++) {
                  if (results[i].name === "Default"){
                    shownWallet.value = results[i];
                    hasSorted = true
                    break
                  }
                }
              } else {
                //find shown wallet and display it
                for (let i = 0; i < results.length; i++) {
                  if (results[i].id === shownWallet.value.id){
                    shownWallet.value = results[i];
                  }
                }
              }

              //logic for going through all spendings
              try {
                //logic to get spendings array by the last 30 days (sent to the charts)

                //logic to get spendings total to display it in the total card

                //logic to get average spendings to display it in the avg card

              } catch (e) {
                //set them all to zero
              }

              
            });
        }
      });

      



      //Logic for updating data
      // await getRef(uid)
      // result.value.update({
      //   name: "horny on main"
      // })
    });

    //event that handles when a wallet gets clicked
    const showWallet = (wallet) => {
      shownWallet.value = wallet;
    };

    const balanceModal = () => {
      context.emit("balanceModal", shownWallet.value);
    };

    const spendingsModal = () => {
      context.emit("spendingsModal", shownWallet.value);
    };

    const addWalletModal = () => {
      context.emit("addWalletModal");
    };

    const editWallet = (wallet) => {
      context.emit("edit", wallet);
    };

    return {
      balanceModal,
      spendingsModal,
      addWalletModal,
      showWallet,
      doc,
      queryRes,
      shownWallet,
      editWallet,
      spendingsTotal,
      spendingsAvg
    };
  },
};
</script>

<style scoped>
body {
  text-align: left;
}
</style>
