<template>
  <div id="app">
    <div id="nav" v-if="this.$store.state.auth.user">
      <router-link to="/">Start</router-link>
      <router-link to="/items">Saker</router-link>
      <router-link to="/developer">Utvecklare</router-link>
      <p @click="signOut()" to="/sign-out">Logga ut</p>
    </div>
    <router-view />
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "App",
  methods: {
    async signOut() {
      return store.dispatch("SIGN_OUT");
    }
  }
};

</script>

<style scoped lang="scss">
* {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: 600px;
  margin: 0 auto;

  p {
    font-weight: bold;
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
