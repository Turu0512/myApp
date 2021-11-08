import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "loginUsersData",
    storage: window.sessionStorage,
    paths: ["login.loginUser"]
  })(store);
};
