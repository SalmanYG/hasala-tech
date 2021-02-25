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
            <input v-model="name" class="form-control" type="text" />
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
            />
            <small class="form-text text-muted"
              >Press enter to add more users</small
            >
            <div v-for="email in emails" :key="email" class="pill">
              {{ email }}
            </div>
          </div>
          <button @click="saveWallet" class="btn btn-primary">
            Save changes
          </button>
          <button @click="deleteWallet" id="delete" class="btn btn-danger">
            Delete wallet
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["wallet"],
  setup(props, context) {
    // const name = ref("")
    // const amount = ref(0)
    // const emails = ref([])
    // const email = ref("")

    //logic for getting emails of all users available

    //logic for adding another email to the list

    const saveWallet = () => {
      //logic for updating value of the wallet
    };

    const deleteWallet = () => {
      //logic for deleting current wallet and all its existence (in users)
      //algorithm would be to delete wallet id from all users whose ids are in wallet.users
      //so, get all users. delete wallet.id from user.wallets
      //then delete wallet safely.
    };

    const closeModal = () => {
      context.emit("close");
    };

    return { closeModal, saveWallet, deleteWallet };
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
