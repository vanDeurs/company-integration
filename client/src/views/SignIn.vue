<template>
  <div class="sign-in">
    <div class="container">
      <form class="form box-shadow-1" @submit.prevent="onSubmit">
        <h2>Logga in</h2>
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
        <div class="text-right">
          <button class="success">Logga in</button>
        </div>
        <p>
          Inte medlem?
          <router-link to="/sign-up">Registrera dig!</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Cookies from "js-cookie";

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
        const response = await api().post("/users/sign-in", {
          email,
          password
        });
        if (response.data.user) {
          const { user } = response.data;
          this.$store.commit("SET_USER", user);
          Cookies.set("token", user.token, { expires: 1 });
          this.$router.push("/");
        }
      } catch (error) {
        console.log("error: ", error);
        const code = error.response.status;
        if (code === 400) {
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
