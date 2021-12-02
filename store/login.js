import firebase from "@/plugins/firebase";

export const state = () => ({
  loginUser: ""
});

export const mutations = {
  setLoginUser(state, user) {
    state.loginUser = user;
  },

  logout(state) {
    state.loginUser = null;
  }
};

export const actions = {
  logoutFb({ commit }) {
    firebase.auth().signOut();
    commit("logout");
  }
};

export const getters = {
  userName: state => (state.loginUser ? state.loginUser.displayName : ""),
  photoURL: state => (state.loginUser ? state.loginUser.photoURL : ""),
  user: state => state.loginUser
};
