import router from "@/router";
import api from "@/api";
import Cookies from "js-cookie";

const state = {
  user: undefined
};

const mutations = {
  SET_USER(state, payload) {
    if (payload === null) {
      state.user = null;
      return;
    }
    state.user = {
      ...state.user,
      ...payload
    };
  }
};

const actions = {
  async AUTHENTICATE(context) {
    try {
      const response = await api.get("/users/authenticate");
      const user = response.data;
      if (user) {
        context.commit("SET_USER", user);
        Cookies.set("token", user.token, { expires: 1 });
      }
    } catch (error) {
      console.log(error);
    }
  },
  async SIGN_IN(context) {
    try {
      const response = await api.post("/users/sign-in");
      const user = response.data;
      if (user) {
        context.commit("SET_USER", user);
        Cookies.set("token", user.token, { expires: 1 });
      }
    } catch (error) {
      console.log(error);
    }
  },
  async SIGN_OUT(context) {
    try {
      await api.delete("/users/sign-out");
    } catch (error) {
      console.log(error);
    }
    context.commit("SET_USER", null);
    Cookies.remove("token");
    router.push("/sign-in");
  }
};

export default {
  state,
  actions,
  mutations
};
