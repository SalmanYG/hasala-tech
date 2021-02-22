<template>
  <div v-if="doc" class="container">
    <div class="cards row">
      <div class="col">
        <Card @balanceModal="balanceModal" title="Balance" :content="shownWallet.balance" :button="true" />
      </div>
      <div class="col">
        <Card @spendingsModal="spendingsModal" title="Spendings" content="120" :button="true" />
      </div>
      <div class="col">
        <Card  title="Average Spendings" content="50" :button="false" />
      </div>
    </div>
    <div class="charts row">
      <div class="col-6">
        <LineChart />
      </div>
      <div class="col-6">
        <PieChart />
      </div>
    </div>
    <div class="wallets row">
      <div class="col">
        <WalletList @show="showWallet" @addWalletModal="addWalletModal" :wallets="queryRes"/>
      </div>
    </div>
  </div>
  <div class="overlay"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import Card from "./Card.vue";
import PieChart from "./PieChart.vue";
import LineChart from "./LineChart.vue";
import WalletList from "./WalletList.vue";

import getUser from "../composables/getUserAuth"
import getFromCollection from "../composables/getFromCollection"
import docRef from "../composables/docRef"

export default {
  components: {
    Card,
    PieChart,
    LineChart,
    WalletList
  },

  setup(props, context) {

    //variables and refs that aren't from composables
    const queryRes = ref([])
    const shownWallet = ref({balance: -1}) //for now

    //for getting returned values from composables
    const { doc, getDoc } = getFromCollection("users") //to get documents
    const { getRef, result } = docRef("users") //to update single document
    const { getCollRef, collResult } = docRef("wallets") //to query from a collection

    //to execute anthing else (+ methods that require await)
    onMounted(async () => {

      //Logic to get document/s (for user)
      const { user } = getUser()
      const uid = user.value.uid
      
      await getDoc(uid)

      
      //Logic for updating data
      // await getRef(uid)
      // result.value.update({
      //   name: "horny on main"
      // })

      //Logic for querying data

      //first we get the reference of the wallets document
      await getCollRef()

      //this code triggers whenever we update any document inside wallets collection
      let results = []
      await collResult.value.where("users", "array-contains", uid).orderBy("createdAt").onSnapshot( (snap) => {
        results = snap.docs.map((document) => {
          return {...document.data(), id: document.id}
        })
        queryRes.value = results
        console.log(queryRes.value)
      })
      //we make the default as the displayed wallet by default
      //can be changed later using emits and events
      // shownWallet.value = queryRes.value[0]
      
    })

    //event that handles when a wallet gets clicked
    const showWallet = (wallet) => {
      shownWallet.value = wallet
    };

    const balanceModal = () => {
      context.emit("balanceModal");
    };

    const spendingsModal = () => {
      context.emit("spendingsModal");
    };

   
    const addWalletModal = () => {
      context.emit("addWalletModal");
    };

    
    return { balanceModal, spendingsModal, addWalletModal, showWallet, doc, queryRes, shownWallet };
  }
};
</script>

<style scoped>
body {
  text-align: left;
}
</style>