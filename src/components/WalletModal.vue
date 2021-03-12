<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="card" style="width: 18rem;">
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
              @keydown.enter.prevent=""
              v-model="email"
              type="email"
              :disabled="isDefault"
            />
            <small v-if="isDefault" class="form-text text-muted">
              You can't add more users to the default wallet
            </small>
            <small v-else class="form-text text-muted">
              Press [Enter] to add more users
            </small>
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
import { auth } from "../firebase/config";
import updateWallet from "../composables/updateWallet";
import { onMounted, ref } from 'vue';
import docRef from '../composables/docRef';

export default {
  props: ["wallet"],
  setup(props, context) {
    const name = ref("")
    const amount = ref(0)
    const emails = ref([])
    const email = ref("")
    const isDefault = ref(false)

    const { getCollRef, collResult } = docRef("users");

    onMounted(async () => {
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

    })

    const saveWallet = async () => {
      //logic for updating value of the wallet
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

    return { closeModal, saveWallet, deleteWallet, isDefault, name, amount, email, emails };
  },
};
</script>

<style scoped>
button {
  margin-top: 5%;
}
#delete {
  margin-left: 2%;
}
.close {
  margin-top: 0%;
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
}
.card {
  margin: auto;
  width: 50%;
  top: 30%;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
</style>
