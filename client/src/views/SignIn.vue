<template>
  <div class="sign-in">
    <div class="container">
      <form class="form box-shadow-1" @submit.prevent="onSubmit">
        <h2>Sign in</h2>
        <input
          v-model="email"
          placeholder="E-mail"
          :class="{ error: (errors.error && !email) || errors.password_email }"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          :class="{
            error: (errors.error && !password) || errors.password_email
          }"
        />
        <p v-if="errors.password_email" class="error">
          {{ errors.password_email }}
        </p>
        <p v-if="errors.error" class="error">
          {{ errors.error }}
        </p>
        <p>
          <router-link to="/reset-password">Forgot your password?</router-link>
        </p>
        <div class="text-right">
          <button class="success">Sign in</button>
        </div>
        <p>Not a member? <router-link to="/sign-up">Sign up</router-link>.</p>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "sign-in",
  data() {
    return {
      email: null,
      password: null,
      errors: {}
    };
  },
  components: {},
  methods: {
    async onSubmit() {
      this.errors = {};
      const { email, password } = this;
      if (!email || !password) {
        this.errors = { ...this.errors, error: "All fields are required." };
      }

      try {
        const response = await api.post("/users/sign-in", { email, password });
        const user = response.data;

        if (user) {
          this.$store.commit("SET_USER", user);
          this.$router.push("/");
        }
      } catch (error) {
        const code = error.response.status;
        if (code === 401) {
          this.errors = {
            ...this.errors,
            password_email: "Invalid e-mail or password."
          };
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.sign-in {
  padding-top: 2rem;

  form {
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background: #fff;
  }
  a {
    text-decoration: none;
  }
}
</style>
