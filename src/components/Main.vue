<template>
  <div v-if="doc">
    <div class="container">
      <!-- <div class="wallet-selector row">
        <div class="col-sm-12">
          <WalletSelector/>
        </div>
      </div> -->
      <div class="cards row">
        <div class="col-md-4 col-sm-12">
          <Card
            @balanceModal="balanceModal"
            title="Balance"
            :content="shownWallet.balance"
            :button="true"
          />
        </div>
        <div class="col-md-4 col-sm-12">
          <Card
            @spendingsModal="spendingsModal"
            title="Spendings"
            :content="spendingsTotal"
            :button="true"
          />
        </div>
        <div class="col-md-4 col-sm-12">
          <Card title="Average Spendings" :content="spendingsAvg" :button="false" />
        </div>
      </div>
      <div v-if="spendings.length" class="charts row">
        <div class="col-md-6 col-sm-12">
          <LineChart :data="daySpendingData" :labels="daySpendingLabels"/>
        </div>
        <div class="col-md-6 col-sm-12">
          <PieChart :data="categoryData"/>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-sm-12">
          <div class="alert alert-warning">
            Data will be shown when this wallet have some spendings.
          </div>
        </div>
      </div>
      <div class="wallets row">
        <div class="col">
          <WalletList
            @show="showWallet"
            @edit="editWallet"
            @addWalletModal="addWalletModal"
            :wallets="queryRes"
            :shownWallet="shownWallet"
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

    const spendings = ref([]) //to move the data of all related spendings to charts
    const spendingsTotal = ref(0) //to display in the card
    const spendingsAvg = ref(0) ////to display in the card
    const categoryData = ref([])
    const daySpendingData = ref([])
    const daySpendingLabels = ref([])

    //for getting returned values from composables
    const { doc, getDoc } = getFromCollection("users"); //to get documents
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
                getSpendings(shownWallet.value)

              } catch (e) {
                //just in case
              }

              
            });
        }
      });
    });

    //event that handles when a wallet gets clicked
    const showWallet = async (wallet) => {
      shownWallet.value = wallet;
      await getSpendings(wallet)
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

    const getSpendings = async (wallet) => {

      try {
        if(await wallet.spendings) {

          spendings.value.length = 0
          let spendArr = wallet.spendings
          let monthAgo = new Date()
              monthAgo.setDate(monthAgo.getDate() - 31)
          let count = 0
          let total = 0

          //The array is being traversed in reverse to capture the latest spendings only
          for (let i = spendArr.length - 1; i >= 0; i--) {
            let spend = spendArr[i]
            let spendDate = await spend.createdAt.toDate()
            if (await spendDate >= monthAgo) {
              spendings.value[count] = await spend
              total += parseFloat(await spend.amount)
              count++
            } else {
              break
            }
          }

          ////////////////////////////////////////////////////////
          ///////////spendings reversed successfully//////////////
          ////////////////////////////////////////////////////////



          if(count > 0) {
            spendingsTotal.value = total
            spendingsAvg.value = (total/count).toFixed(2)
          } else {
            spendingsTotal.value = 0
            spendingsAvg.value = 0
          }

          ////////////////////////////////////////////////////////
          /////////Total and Avg calculated successfully//////////
          ////////////////////////////////////////////////////////



          let data = [0, 0, 0, 0, 0, 0, 0, 0, 0]
          for (let i = 0; i < spendings.value.length; i++) {
            const el = spendings.value[i]
            switch (el.category) {
                case "Housing":
                    data[0] += parseFloat(el.amount)
                    break;
                case "Transportation":
                    data[1] += parseFloat(el.amount)
                    break;
                case "Food":
                    data[2] += parseFloat(el.amount)
                    break;
                case "Utilities":
                    data[3] += parseFloat(el.amount)
                    break;
                case "Healthcare":
                    data[4] += parseFloat(el.amount)
                    break;
                case "Personal":
                    data[5] += parseFloat(el.amount)
                    break;
                case "Bills":
                    data[6] += parseFloat(el.amount)
                    break;
                case "Entertainment":
                    data[7] += parseFloat(el.amount)
                    break;
                default:
                    data[8] += parseFloat(el.amount)
                    break;
            }
          }
          categoryData.value = data

          ////////////////////////////////////////////////////////
          ////////Pie Chart Data calculated successfully//////////
          ////////////////////////////////////////////////////////

          let prevDate = ""
          let spendPerDay = []
          let spendDays = []
          for (let i = spendings.value.length - 1; i >= 0; i--) {
            const spend = spendings.value[i]
            let currDate = spend.createdAt.toDate().getDate() + "/" + (spend.createdAt.toDate().getMonth() + 1)
            if (currDate === prevDate) {
                spendPerDay[spendPerDay.length - 1] += parseFloat(spend.amount)
            }
            else {
              spendDays.push(currDate)
              prevDate = currDate
              spendPerDay.push(parseFloat(spend.amount))
            }
          }

          daySpendingLabels.value = spendDays
          daySpendingData.value = spendPerDay
          
          ////////////////////////////////////////////////////////
          ////////Line Chart Data calculated successfully/////////
          ////////////////////////////////////////////////////////

        } else {
          spendings.value.length = 0
          spendingsTotal.value = 0
          spendingsAvg.value = (0).toFixed(2)
          daySpendingLabels.value.length = 0
          daySpendingLabels.value.length = 0
          categoryData.length = 0
        }
      } 
      catch (e) {
        console.log(e.message, "The error is in line:", e.lineNumber)
      }
    }

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
      spendingsAvg,
      spendings,
      categoryData,
      daySpendingData,
      daySpendingLabels
    };
  },
};
</script>

<style scoped>
body {
  text-align: left;
}

@media (max-width: 767px) {
    .cards {
      margin-top: 65px;
      margin-bottom: 10px;
    }

    .wallets {
      margin-bottom: 20px;
    }
}

@media (max-width: 349px) {
  .cards {
      margin-top: 100px;
    }
}
</style>
