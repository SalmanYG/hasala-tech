<template>
<!-- Balance Modal -->
  <div v-if=" title==='balance' ">
    <div class="backdrop" @click.self="closeModal">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <button @click="closeModal" type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">Add Balance</h5>

          <form @submit.prevent="addBalance">
            <div class="form-group">
              <label>Amount (SR)</label>
              <input v-model="amount" class="form-control" type="number" />
            </div>
            <button class="btn btn-primary">Add balance</button>
          </form>
        </div>
      </div>
    </div>
  </div>
<!-- Spendings Modal -->
  <div v-else-if=" title==='spendings' ">
    <div class="backdrop" @click.self="closeModal">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <button @click="closeModal" type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">Add Spending</h5>

          <form @submit.prevent="addSpending">
            <div class="form-group">
              <label>Amount (SR)</label>
              <input v-model="amount" class="form-control" type="number" />
            </div>
            <button class="btn btn-primary">Add spending</button>
          </form>
        </div>
      </div>
    </div>
  </div>
<!-- Wallets Modal -->
  <div v-else-if=" title==='wallet' ">
    <div class="backdrop" @click.self="closeModal">
      <div class="card" style="width: 18rem;">
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
              <label>Users's Email</label>

              <input
                class="form-control"
                @keydown.enter.prevent="handleKeydown"
                v-model="user"
                type="email"
              />
              <small id="passwordHelpBlock" class="form-text text-muted">
                Press enter to add more users
              </small>
              <div v-for="user in users" :key="user" class="pill">{{ user }}</div>
            </div>
            <button class="btn btn-primary">Add wallet</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["title"],
  setup(props, context) {
    const users = ref([]);
    const user = ref("");
    const name = ref("");
    const amount = ref(0);

    const handleKeydown = () => {
      if (!users.value.includes(user.value)) {
        user.value = user.value.replace(/\s/g, ""); // remove all whitespace
        users.value.push(user.value);
      }
      user.value = "";
    };

    const closeModal = () => {
      context.emit("close");
    };

    const addBalance = () => {
      /*
firebaseSomething.add(amount.value)
*/
    };

    const addSpending = () => {
      /*
firebaseSomething.add(amount.value)
*/
    };

    return {
      handleKeydown,
      users,
      user,
      closeModal,
      amount,
      addBalance,
      addSpending,
      name
    };
  }
};
</script>

<style scoped>
button {
  margin-top: 5%;
}
.close {
  margin-top: 0%;
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
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
</style>