<template>



  <!-- Success Alert -->
  <div v-if="walletSuccess">
    <div class="alert alert-success" role="alert">Wallet has been added!</div>
  </div>
  <!-- Balance Modal -->
  <div v-if="title === 'balance' && wallet">
    <div class="backdrop" @click.self="closeModal">
      <div class="card" style="width: 20rem;">
        <div class="card-body">
          <button @click="closeModal" type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">Add Balance</h5>

          <form @submit.prevent="addBalance">
            <div class="form-group">
              <label>Amount (SR)</label>
              <input v-model="amount" class="form-control" type="number"/>
              <div v-if="warning" class="alert alert-danger">{{alert}}</div>
            </div>
            <button class="btn btn-primary">Add balance</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Spendings Modal -->
  <div v-else-if="title === 'spendings' && wallet">
    <div class="backdrop" @click.self="closeModal">
      <div class="card" style="width: 20rem;">
        <div class="card-body">
          <button @click="closeModal" type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">Add Spending</h5>

          <form @submit.prevent="addSpending">
            <div class="form-group">
              <label>Amount (SR)</label>
              <input v-model="amount" class="form-control" type="number" />
              <div v-if="warning" class="alert alert-danger">{{alert}}</div>
              <label>Category</label>
              <select required name="category" id="category" class="form-select" v-model="category">
                <option selected value="">Select a category</option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Utilities">Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Personal">Personal</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            
            <button class="btn btn-primary">Add spending</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Wallets Modal -->
  <div v-else-if="title === 'wallet'">
    <div class="backdrop" @click.self="closeModal">
      <div class="card add">
        <div class="card-body">
          <button @click="closeModal" type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">Add Wallet</h5>

          <form @submit.prevent="addWallet">
            <div class="form-group">
              <label>Name</label>
              <input v-model="name" class="form-control" type="text" />
            </div>
            <div class="form-group">
              <label>Balance (SR)</label>
              <input v-model="amount" class="form-control" type="number" />
            </div>
            <div class="form-group">
              <label>Users' Email</label>

              <input
                class="form-control"
                @keydown.enter.prevent="handleKeydown"
                v-model="email"
                type="email"
              />
              <div>
                <small class="form-text text-muted">
                  Press 'Enter' to add user
                </small>
              </div>
              <div v-for="email in emails" :key="email" class="pill">
                {{ email }}
              </div>
              <div>
                <button class="btn btn-primary">Add wallet</button>
              </div>
            </div>
          </form>
          <div v-if="error">
            <div class="alert alert-danger modal-alert" role="alert">
              {{ error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  

</template>

<script>
import { ref, onMounted } from "vue";
import { auth,arrUnion, timeStamp } from "../firebase/config";
import addToCollection from "../composables/addToCollection";
import docRef from "../composables/docRef";
import updateWallet from "../composables/updateWallet";
export default {
  props: ["title","wallet"],
  setup(props, context) {
    const users = ref([]);
    const emails = ref([]);
    const email = ref("");
    const name = ref("");
    const amount = ref(0);
    const category = ref("")
    const warning = ref(false)
    const alert = ref("")

    // to get user before loading page
    const user = ref(auth.currentUser);
    let uid = ref({});
    onMounted(async () => {
      auth.onAuthStateChanged((newUser) => {
        if (newUser) {
          user.value = newUser;
          uid.value = user.value.uid;
        }
      });

      
    });

    const { addDoc, error } = addToCollection("wallets");
    const { getRef, result } = docRef("users");
    const { getCollRef, collResult } = docRef("users");
    
    
    const walletSuccess = ref(false);

    //used for filtering repeated emails
    const handleKeydown = () => {
      if (!emails.value.includes(email.value)) {
        email.value = email.value.replace(/\s/g, ""); // remove all whitespace
        emails.value.push(email.value);
      }
      email.value = "";
    };

    //closes modal
    const closeModal = () => {
      context.emit("close");
    };

    //Logic for adding wallets
    const addWallet = async () => {
      //logic to filter users
      users.value.push(uid.value); //add the current user first

      //makes the query to get the document id that has an email found in emails array
      try {
        await getCollRef();
        for await (let email of emails.value) {
          let query = await collResult.value.where("email", "==", email).get();
          try {
            //lazy way to access the single document (it's the official way :\)
            users.value.push(query.docs[0].id);
          } catch (error) {
            console.log(error.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }

      // the name "default" for wallets is restricted
      if (name.value.toUpperCase() === "default".toUpperCase()) {
        error.value = "Default wallet already created";
      }

      if (!error.value) {
        //add the filtered wallet
        let wal = {
          users: users.value,
          balance: amount.value,
          name: name.value,
          createdAt: timeStamp(),
        };
        let wid = await addDoc(wal);

        //update the spendings with the same amount to go around the bug
        //that firestore has with its increment method
        const { updateBalance } = updateWallet(wid)
        await updateBalance(amount.value)

        //add wallet id to users
        for await (let user of users.value) {
          await getRef(user);
          result.value.update({
            wallets: arrUnion(wid), //add to existing wallet array
          });
        }

        //close the modal

        walletSuccess.value = true;
        closeModal();
      }
    };

    const addBalance = async () => {
      if(amount.value > 0) {
        const { updateBalance } = updateWallet(props.wallet.id);
        await updateBalance(amount.value);
        closeModal()
      }
      else {
        alert.value = "Please enter a value greater than 0"
        warning.value = true
      }
    };

    const addSpending = async () => {
      if(amount.value > 0) {
        if(props.wallet.balance - amount.value >= 0) {
          const { updateSpendings, updateBalance } = updateWallet(props.wallet.id);
          await updateSpendings(amount.value, category.value)
          //decrement the balance by the amount spent
          await updateBalance(-amount.value);
          closeModal()
        }
        else {
          alert.value = "Please enter a value within your balance"
          warning.value = true
        }
      }
      else {
        alert.value = "Please enter a value greater than 0"
        warning.value = true
      }
      
    };

    return {
      handleKeydown,
      emails,
      email,
      closeModal,
      amount,
      addBalance,
      addSpending,
      name,
      addWallet,
      walletSuccess,
      error,
      category,
      warning,
      alert
    };
  },
};
</script>

<style scoped>
button {
  margin-top: 5%;
  width: 100%;
}
.close {
  margin-top: 0%;
  position: absolute;
  left: 137px;
  top: 10px;
  border: none;
  background: none;
}

.add .close {
  left: 185px;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.card {
  margin: auto;
  width: 50%;
  top: 30%;
}

.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}

.add {
  width: 26rem;
}

@media (max-width: 768px) {
    .add {
      width: 20rem;
    }

    .add .close {
      left: 137px;
    }
}

.modal-alert {
  margin-top: 3%;
}

.alert {
  margin: 5px 0;
}
</style>
