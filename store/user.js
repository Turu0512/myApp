import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export const state = () => ({
  transferUsers: [],
  editUserData: "",
  stopUsers: [],
  amTransferOderList: [],
  loginUser: ""
});
// ------------------Mutations-------------------------------
export const mutations = {
  addUser(state, usersList) {
    state.transferUsers.push(usersList);
    this.$router.push({ name: "servisUserList" });
  },

  getEditUser(state, getEditUser) {
    state.editUserData = "";
    state.editUserData = getEditUser;
  },

  getUsersList(state, usersList) {
    state.transferUsers = [];
    state.transferUsers = usersList;
  },

  setStopUsersList(state, stopUsers) {
    state.stopUsers = "";
    state.stopUsers = stopUsers;
  },

  setLoginUser(state, user) {
    state.loginUser = user;
  }
};

// --------------------Actions-------------------------
export const actions = {
  async addUser({ rootState, commit }, user) {
    const uid = rootState.login.loginUser.uid;
    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("usersList")
      .add({ ...user })
      .then(res => {
        fbstore
          .collection("adminUser")
          .doc(uid)
          .collection("usersList")
          .doc(res.id)
          .update({
            id: res.id
          })
          .then(() => {
            commit("addUser", user);
          });
      });
  },
  // -----edit----------------------------------------------------------------------------------------
  async updateUser({ commit }, user) {
    const users = await firebase.auth().currentUser;
    const uid = users.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("usersList")
      .doc(user.id)
      .update({
        ...user
      })
      .then(this.$router.push({ name: "servisUserList" }));
  },

  async fetchEditUser({ commit }, id) {
    const getUserRef = fbstore
      .collection("adminUser")
      .doc(id.uid)
      .collection("usersList")
      .doc(id.id);
    const getUser = await getUserRef.get();
    const getEditUser = getUser.data();

    commit("getEditUser", getEditUser);
  },

  // -----usersList--------------------------------------------------------------------
  async getUsersList({ rootState, commit }) {
    let list = [];
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("usersList")
      .orderBy("firstNameRuby")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
      });
    commit("getUsersList", list);
  },

  // -----stopUsers----------------------------------------------------------------------

  deleteUser({ commit }, user) {
    const uid = firebase.auth().currentUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("usersList")
      .doc(user.id)
      .delete()
      .then(() => {
        this.$router.push({ name: "servisUserList" });
        // console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  },

  deleteStopUser({ commit }, id) {
    const uid = firebase.auth().currentUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("stopedUsersList")
      .doc(id)
      .delete()
      .then(() => {
        this.$router.push({ name: "stopUser" });
        // console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  },

  stopedUser({ commit }, user) {
    const uid = firebase.auth().currentUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("stopedUsersList")
      .doc(user.id)
      .set({
        ...user
      });
  },

  async fetchStopUsers({ commit }, uid) {
    const list = [];
    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("stopedUsersList")
      .orderBy("firstNameRuby")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => list.push(doc.data()));
      });
    commit("setStopUsersList", list);
  },

  async fetchStopUserData({ commit }, id) {
    const getUserRef = fbstore
      .collection("adminUser")
      .doc(id.uid)
      .collection("stopedUsersList")
      .doc(id.id);
    const getUser = await getUserRef.get();
    const getEditUser = getUser.data();

    commit("getEditUser", getEditUser);
  },

  returnUsersList({ commit }, user) {
    const uid = firebase.auth().currentUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("usersList")
      .doc(user.id)
      .set({
        ...user
      });
  }
};

// -----------------------Getters-------------------------
export const getters = {
  users: state => {
    return state.transferUsers;
  },

  editUsersData: state => {
    return state.editUserData;
  },

  stopUsers: state => {
    return state.stopUsers;
  }
};
