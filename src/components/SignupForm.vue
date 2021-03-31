<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-12 col-xl-10">
        <div class="card shadow-lg o-hidden border-0 my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-6 d-none d-lg-flex">
                <div class="flex-grow-1 bg-login-image"></div>
              </div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h4 class="text-dark mb-4">Create an Account!</h4>
                  </div>
                  <form @submit.prevent="handleSubmit" class="user">
                    <div class="form-group">
                      <input
                        required
                        v-model="displayName"
                        class="form-control form-control-user"
                        type="text"
                        placeholder="Display Name "
                      />
                    </div>
                    <div class="form-group">
                      <input
                        style="margin-top: 3%;"
                        required
                        v-model="email"
                        class="form-control form-control-user"
                        type="email"
                        placeholder="Email "
                      />
                    </div>
                    <div class="form-group">
                      <input
                        style="margin-top: 3%;"
                        required
                        v-model="password"
                        class="form-control form-control-user"
                        type="password"
                        placeholder="Password"
                      />
                    </div>

                    <button class="btn btn-primary btn-block text-white btn-user">Sign Up</button>

                    <div v-if="error">
                      <div
                        style="margin-top: 3%;"
                        class="alert alert-danger"
                        role="alert"
                      >{{ error }}</div>
                    </div>

                    <div v-if="!error && submitted">
                      <div
                        style="margin-top: 3%;"
                        class="alert alert-success"
                        role="alert"
                      >Sign up is succesful !</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useSignup from "../composables/signup";

export default {
  setup(props, context) {
    const { error, signup } = useSignup();

    onMounted(() => {
      error.value = false
    })
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const submitted = ref(false);

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      submitted.value = true;
      if (!error.value) {
        context.emit("sucessfulSignup", submitted.value);
      }
    };
    return { submitted, error, displayName, email, password, handleSubmit };
  }
};
</script>

<style scoped>
button{
  margin-top: 3%;
  width: 100%;
}

.bg-login-image {
  background-image: url("../assets/riyadh.jpg");
  background-size: 100% 400px;
}
</style>