import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export const state = () => ({
  transferUsers: [],
  editUserData: [],
  stopUsers: [],
  amTransferOderList: []
});
// ------------------Mutations-------------------------------
export const mutations = {
  addUser(state, usersList) {
    // console.log(usersList);
    state.transferUsers.push(usersList);
  },

  getEditUser(state, getEditUser) {
    state.editUserData = [];
    state.editUserData.push(getEditUser);
    // console.log(state.editUser)
  },

  getUsersList(state, usersList) {
    console.log(usersList);
    state.transferUsers = "";
    state.transferUsers = usersList;
  },

  setStopUsersList(state, stopUsers) {
    state.stopUsers = "";
    state.stopUsers = stopUsers;
  }
};

// --------------------Actions-------------------------
export const actions = {
  async addUser({ commit }, user) {
    await fbstore
      .collection("usersList")
      .add({})
      .then(res => {
        fbstore
          .collection("usersList")
          .doc(res.id)
          .set({
            ...user,
            id: res.id
          })
          .then(() => {
            commit("addUser", user);
            console.log(user, res.id);
          });
      });
  },
  // -----edit----------------------------------------------------------------------------------------
  updateUser({ commit }, user) {
    fbstore
      .collection("usersList")
      .doc(user.id)
      .update({
        ...user
      });
  },

  async fetchEditUser({ commit }, id) {
    const getUserRef = fbstore.collection("usersList").doc(id);
    const getUser = await getUserRef.get();
    const getEditUser = getUser.data();

    commit("getEditUser", getEditUser);
  },

  // -----usersList--------------------------------------------------------------------
  async getUsersList({ commit }) {
    const list = [];
    await fbstore
      .collection("usersList")
      .orderBy("firstNameRuby")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => list.push(doc.data()));
      });
    commit("getUsersList", list);
  },

  // -----stopUsers----------------------------------------------------------------------

  deleteUser({ commit }, user) {
    fbstore
      .collection("usersList")
      .doc(user.id)
      .delete()
      .then(() => {
        console.log(user.id);
        console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  },

  stopedUser({ commit }, user) {
    fbstore
      .collection("stopedUsersList")
      .doc(user.id)
      .set({
        ...user
      });
  },

  async fetchStopUsers({ commit }) {
    const list = [];
    await fbstore
      .collection("stopedUsersList")
      .orderBy("firstNameRuby")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => list.push(doc.data()));
      });
    // console.log(list);
    commit("setStopUsersList", list);
  },

  async fetchStopUserData({ commit }, id) {
    const getUserRef = fbstore.collection("stopedUsersList").doc(id);
    const getUser = await getUserRef.get();
    const getEditUser = getUser.data();

    commit("getEditUser", getEditUser);
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
