<template>
  <div class="home">
    <h1>Välkommen till Vinden, {{ name }}!</h1>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Home",
  components: {},
  computed: {
    name() {
      return store.state.auth.user.name;
    }
  }
};
</script>
