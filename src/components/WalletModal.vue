<template>
  <div v-if="isLoaded" class="backdrop" @click.self="closeModal">
    <div class="card add">
      <div class="card-body">
        <button @click="closeModal" type="button" class="close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="card-title">{{ wallet.name }}</h5>

        <form @submit.prevent="">
          <div class="form-group">
            <label>Name</label>
            <input v-model="name" class="form-control" type="text" :disabled="isDefault"/>
          </div>
          <div class="form-group">
            <label>Balance (SR)</label>
            <input v-model="amount" class="form-control" type="number" />
          </div>
          <div class="form-group">
            <label>Users</label>

            <input
              class="form-control"
              @keydown.enter.prevent="handleKeydown"
              v-model="email"
              type="email"
              :disabled="isDefault"
            />
            <div>
              <small v-if="isDefault" class="form-text text-muted">
                You can't add more users to the default wallet
              </small>
              <small v-else class="form-text text-muted">
                Press [Enter] to add more users
              </small>
            </div>
            <div v-for="email in emails" :key="email" class="pill">
              {{ email }}
            </div>
          </div>
          <button @click="saveWallet" class="btn btn-primary">
            Save changes
          </button>
          <button @click="deleteWallet" id="delete" class="btn btn-danger" :disabled="isDefault">
            Delete wallet
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, firestore } from "../firebase/config";
import updateWallet from "../composables/updateWallet";
import { onMounted, ref } from 'vue';
import docRef from '../composables/docRef';

export default {
  props: ["wallet"],
  setup(props, context) {
    const name = ref("")
    const amount = ref(0)
    const emails = ref([])
    const newEmails = ref([])
    const email = ref("")
    const users = ref([])
    const isDefault = ref(false)
    const isLoaded = ref(false)

    //for future update (?)
    // const removedEmails = ref([])
    
    const { getCollRef, collResult } = docRef("users");

    const user = ref(auth.currentUser);
    let uid = ref({})

    onMounted(async () => {
      auth.onAuthStateChanged((newUser) => {
        if (newUser) {
          user.value = newUser;
          uid.value = user.value.uid;
        }
      })

      if(props.wallet.name === "Default") {
        isDefault.value = true
        email.value = "---"
      }
      name.value = props.wallet.name
      amount.value = props.wallet.balance

      //we need to get the emails of all current users in the wallet
      //we do that by taking the id written in the users array of the wallet
      //after that we query for its email in the users collection
      //when we get the email, we push this value to the emails ref array
      let users = await props.wallet.users
      const index = users.indexOf(uid.value)
      if (index > -1) { 
        users.splice(index, 1) 
      }
      for (let uid of users) {
        let doc = await firestore.collection("users").doc(uid).get()
        emails.value.push(doc.data().email)
      }
      isLoaded.value = true
    })

    const handleKeydown = () => {
      if (!emails.value.includes(email.value)) {
        email.value = email.value.replace(/\s/g, ""); // remove all whitespace
        emails.value.push(email.value)
        newEmails.value.push(email.value) //adds the newly added email to different array to get ids later
      }
      email.value = "";
    }


    const saveWallet = async () => {
      //logic for updating value of the wallet
      const { editWallet } = updateWallet(props.wallet.id)
      
      //get all the uids of the newly added users in the newEmails array
      try {
        await getCollRef();
        for await (let email of newEmails.value) {
          let query = await collResult.value.where("email", "==", email).get();
          try {
            //lazy way to access the single document (it's the official way :\)
            console.log("The user id for $(email) is: ", query.docs[0].id)
            users.value.push(query.docs[0].id);
          } catch (error) {
            console.log(error.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }

      //create the data object
      const walletData = {
        name: name.value,
        balance: amount.value,
        users: users.value
      }

      await editWallet(walletData)
      closeModal()
    };

    const deleteWallet = async () => {
      //logic for deleting current wallet and all its existence (in users)
      //algorithm would be to delete wallet id from all users whose ids are in wallet.users
      //so, get all users. delete wallet.id from user.wallets
      //then delete wallet safely.

      const { deleteWallet } = updateWallet(props.wallet.id);
      await deleteWallet();
      closeModal();
    };

    const closeModal = () => {
      context.emit("close");
    };

    return { closeModal, saveWallet, deleteWallet, isDefault, isLoaded, name, amount, email, emails, handleKeydown };
  },
};
</script>

<style scoped>
button {
  margin-top: 3%;
  width: 100%;
}
.close {
  margin-top: 0%;
  position: absolute;
  left: 185px;
  top: 10px;
  border: none;
  background: none;
}
.card {
  margin: auto;
  width: 70%;
  top: 30%;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
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
      width: 18rem;
    }

    .close {
      left: 125px;
    }
}
</style>
