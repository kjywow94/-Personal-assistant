import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
    user: "",
    auth: "",
    imgur: "",
    pushToken: "",
    portfolio_count: "",
    post_count: ""
  },
  plugins: [createPersistedState()],
  mutations: {
    session(state, user) {
      state.user = user;
    },
    auth(state, auth) {
      state.auth = auth;
    },
    imgur(state, imgur) {
      state.imgur = imgur;
    },
    portfolio_count(state, portfolio_count) {
      state.portfolio_count = portfolio_count;
    },
    post_count(state, post_count) {
      state.post_count = post_count;
    }
  }
});
