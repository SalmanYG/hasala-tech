<template>
  <div v-if="doc" class="container">
    <div class="cards row">
      <div class="col">
        <Card @balanceModal="balanceModal" title="Balance" :content="doc.email" :button="true" />
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
        <WalletList @walletModal="walletModal" :wallets="queryRes"/>
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

    //for getting returned values from composables
    const { doc, getDoc } = getFromCollection("users") //to get documents
    const { getRef, result } = docRef("users") //to update single document
    const { getCollRef, collResult } = docRef("wallets") //to query from a collection

    //to execute anthing else (+ methods that require await)
    onMounted(async () => {

      //Logic to get document/s
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
      await collResult.value.where("users", "array-contains", uid).onSnapshot((snap) => {
        let results = snap.docs.map((document) => {
          return {...document.data(), id: document.id}
        })
        queryRes.value = results
      })
    })

    const balanceModal = () => {
      context.emit("balanceModal");
    };

    const spendingsModal = () => {
      context.emit("spendingsModal");
    };

   
    const walletModal = () => {
      context.emit("walletModal");
    };

    return { balanceModal, spendingsModal, walletModal, doc, queryRes };
  }
};
</script>

<style scoped>
body {
  text-align: left;
}
</style>