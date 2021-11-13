import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export const state = () => ({
  driverList: []
});
// ------------------Mutations-------------------------------
export const mutations = {
  addDriver(state, driver) {
    state.driverList.push(driver);
  },

  addDriverList(state, list) {
    state.driverList = list;
    // console.log(list)
  }
};

// --------------------Actions-------------------------
export const actions = {
  async createDriver({ commit, dispatch }, data) {
    await fbstore
      .collection("adminUser")
      .doc(data.uid)
      .collection("driverList")
      .add({})
      .then(res => {
        fbstore
          .collection("adminUser")
          .doc(data.uid)
          .collection("driverList")
          .doc(res.id)
          .set({
            ...data.driver,
            id: res.id,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            commit("addDriver", data.driver);
            dispatch("getDriverList");
          });
      });
  },

  async getDriverList({ rootState, commit }) {
    const list = [];
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("driverList")
      .orderBy("timestamp")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => list.push(doc.data()));
      });
    commit("addDriverList", list);
  },

  saveDriver({ rootState, commit, dispatch }, driver) {
    const uid = rootState.login.loginUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("driverList")
      .doc(driver.id)
      .set({
        ...driver,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    dispatch("getDriverList");
  },

  deleteDriver({ rootState, commit, dispatch }, id) {
    const uid = rootState.login.loginUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("driverList")
      .doc(id)
      .delete()
      .then(() => {
        console.log(id);
        console.log("Document successfully deleted!");
        dispatch("getDriverList");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }
};

// -----------------------Getters-------------------------
export const getters = {
  fetchCarList: state => {
    return state.driverList;
  }
};
