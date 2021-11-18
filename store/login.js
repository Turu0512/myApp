import firebase from "@/plugins/firebase";

export const state = () => ({
  loginUser: ""
});

export const mutations = {
  setLoginUser(state, user) {
    state.loginUser = user;
    // console.log("auth" + user);

    // console.log(state.loginUser)
  },

  logout(state) {
    state.loginUser = null;
  }
};

export const actions = {
  logoutFb({ commit }) {
    firebase.auth().signOut();
    commit("logout");
  },

  // googleLogin({ commit }) {
  //   firebase
  //     .auth()
  //     .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  //     .then(() => {
  //       const provider = new firebase.auth.GoogleAuthProvider();
  //       firebase
  //         .auth()
  //         .signInWithRedirect(provider)
  //         .then(result => {
  //           // ログイン成功時の処理
  //           commit("login/setLoginUser", result.user);
  //           window.alert("ログインしました");
  //         })
  //         .catch(error => {
  //           // ログイン失敗時の処理
  //           window.alert("ログインに失敗しました");
  //           console.log(error);
  //         });
  //     });
  // },
  yahooLogin({ commit }) {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        const provider = new firebase.auth.OAuthProvider("yahoo.com");
        firebase
          .auth()
          .signInWithRedirect(provider)
          .then(result => {
            // ログイン成功時の処理
            commit("login/setLoginUser", result.user);
            window.alert("ログインしました");
          })
          .catch(error => {
            // ログイン失敗時の処理
            window.alert("ログインに失敗しました");
            console.log(error);
          });
      });
  }
};

export const getters = {
  userName: state => (state.loginUser ? state.loginUser.displayName : ""),
  photoURL: state => (state.loginUser ? state.loginUser.photoURL : ""),
  user: state => state.loginUser
};
