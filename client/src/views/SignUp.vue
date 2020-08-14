<template>
  <div class="sign-up">
    <div class="container content">
      <form class="form box-shadow-1" @submit.prevent="onSubmit">
        <h2>Registera dig</h2>
        <input
          v-model="email"
          placeholder="E-mail"
          :class="{ error: (errors.error && !email) || errors.email }"
        />
        <p v-if="errors.email" class="error">
          {{ errors.email }}
        </p>
        <input
          v-model="name"
          placeholder="name"
          :class="{ error: errors.error && !name }"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          :class="{ error: (errors.error && !password) || errors.password }"
        />
        <input
          type="password"
          v-model="passwordRepeat"
          placeholder="Repeat password"
          :class="{
            error: (errors.error && !passwordRepeat) || errors.password
          }"
        />
        <p v-if="errors.password" class="error">
          {{ errors.password }}
        </p>
        <p v-if="errors.error" class="error">
          {{ errors.error }}
        </p>
        <div class="text-right">
          <button class="success">Registera</button>
        </div>
        <p>Redan medlem? <router-link to="/sign-in">Logga in</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "sign-up",
  data() {
    return {
      email: null,
      name: null,
      password: null,
      passwordRepeat: null,
      errors: {}
    };
  },
  methods: {
    async onSubmit() {
      this.errors = {};
      const { email, name, password, passwordRepeat } = this;

      if (!email || !name || !password || !passwordRepeat) {
        this.errors = { ...this.errors, error: "All fields are required." };
      }
      if (password !== passwordRepeat) {
        this.errors = { ...this.errors, password: "Passwords do not match." };
      }

      if (this.errors.error || this.errors.password) return;

      try {
        const response = await api.post("/users/sign-up", {
          email,
          name,
          password
        });
        const user = response.data;

        if (user) {
          this.$store.commit("SET_USER", user);
          this.$router.push("/");
        }
      } catch (error) {
        const code = error.response.status;
        if (code === 422) {
          this.errors = {
            ...this.errors,
            email: "Email is already registered."
          };
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.sign-up {
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
