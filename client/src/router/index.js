import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";
// import SignUp from "../views/SignUp.vue";
// import Developer from "../views/Developer.vue";
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
    component: () =>
      import("../views/SignUp.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/Home.vue"),
    beforeEnter: protectedRoute
  },
  {
    path: "/developer",
    name: "Developer",
    component: () =>
      import("../views/Developer.vue"),
    beforeEnter: protectedRoute
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

async function protectedRoute(from, to, next) {
  const { user } = store.state.auth;
  const token = Cookies.get("token");

  console.log("user: ", user);
  console.log("token: ", token);

  if (!token) {
    return router.push("/sign-in");
  }

  if (!user) {
    await store.dispatch("AUTHENTICATE");
    if (!store.state.auth.user) {
      return store.dispatch("SIGN_OUT");
    }
  }
  next()
}

export default router;
