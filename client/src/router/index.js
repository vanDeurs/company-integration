import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Cookies from "js-cookie";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: protectedRoute
  },
  {
    path: "/about",
    name: "About",
    beforeEnter: protectedRoute,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

async function protectedRoute() {
  if (store.state.auth.user === undefined || !Cookies.get("token")) {
    await store.dispatch("AUTHENTICATE");
  }
  if (!store.state.auth.user) {
    store.dispatch("SIGN_OUT");
  }
}

export default router;
