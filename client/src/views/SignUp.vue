<template>
  <div class="sign-up">
    <div class="container content">
      <form class="form box-shadow-1" @submit.prevent="register()">
        <h2>Registera dig</h2>
        <input
          v-model="email"
          placeholder="Email"
        />
        <p v-if="errors.email">
          {{ errors.email }}
        </p>
        <input
          v-model="name"
          placeholder="Namn"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Lösenord"
        />
        <input
          type="password"
          v-model="passwordRepeat"
          placeholder="Repetera lösenord"
        />
        <p v-if="errors.password">
          {{ errors.password }}
        </p>
        <p v-if="errors.error">
          {{ errors.error }}
        </p>
        <div class="text-right">
          <button class="success">Registera</button>
        </div>
        <p>Redan medlem? <router-link to="/sign-in">Logga in!</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Cookies from "js-cookie";

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
    async register() {
      this.errors = {};
      const { email, name, password, passwordRepeat } = this;

      if (!email || !name || !password || !passwordRepeat) {
        this.errors = { ...this.errors, error: "Du måste fylla i alla fält." };
      }
      if (password !== passwordRepeat) {
        this.errors = { ...this.errors, password: "Lösenorden matchar inte." };
      }

      if (this.errors.error || this.errors.password) return;

      try {
        const response = await api().post("/users/sign-up", {
          email,
          name,
          password
        });
        if (response.data.user) {
          const { user } = response.data;
          this.$store.commit("SET_USER", user);
          Cookies.set("token", user.token, { expires: 1 });
          this.$router.push("/");
        }
      } catch (error) {
        const code = error.response.status;
        if (code === 422) {
          this.errors = {
            ...this.errors,
            email: "Den här mejladressen finns redan."
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
