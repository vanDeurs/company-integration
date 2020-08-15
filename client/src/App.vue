<template>
  <div id="app">
    <div id="nav" v-if="this.$store.state.auth.user">
      <router-link to="/">Start</router-link> |
      <router-link to="/items">Saker</router-link>
      <router-link to="/developer">Utvecklare</router-link>
      <router-link to="/sign-out">Logga ut</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
