<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-12 col-xl-10">
        <div class="card shadow-lg o-hidden border-0 my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-6 d-none d-lg-flex">
                <div class="flex-grow-1 bg-login-image" style="background: #4e73df;"></div>
              </div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h4 class="text-dark mb-4">Welcome Back!</h4>
                  </div>
                  <form @submit.prevent="handleSubmit" class="user">
                    <div class="form-group">
                      <input
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

                    <button class="btn btn-primary btn-block text-white btn-user">Login</button>
                    <div v-if="error">
                      <div
                        style="margin-top: 3%;"
                        class="alert alert-danger"
                        role="alert"
                      >{{ error }}</div>
                    </div>
                  </form>

                  <div class="text-center"></div>
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
import { ref } from "vue";
import useLogin from "../composables/login";

export default {
  setup(props, context) {
    const { error, login } = useLogin();
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        context.emit("login");
      }
    };

    return { error, email, password, handleSubmit };
  }
};
</script>

<style>
</style>