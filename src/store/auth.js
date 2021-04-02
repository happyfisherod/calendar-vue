import service from "@/services/service.js";

export default {
  namespaced: true,
  state: {
    token: "",
    rol: "",
    exp: "",
  },
  getters: {
    authenticaded(state) {
      return state.token;
    },
    rol(state) {
      return state.rol;
    },
    exp(state) {
      return state.exp;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ROL(state, token) {
      state.rol = JSON.parse(atob(token.split(".")[1])).roles[0];
    },
    SET_EXP(state, token) {
      state.exp = JSON.parse(atob(token.split(".")[1])).exp;
      console.log(new Date(state.exp * 1000));
    },
  },
  actions: {
    async logIn({ dispatch }, credentials) {
      let response = await service.post("api/login_check", credentials);
      return dispatch("attempt", response.data.token);
    },
    async attempt({ commit }, token) {
      if (token) {
        commit("SET_TOKEN", token);
        commit("SET_ROL", token);
        commit("SET_EXP", token);
      }
    },
  },
};

