import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export const state = () => ({
  driverList: [],
  amDriverSchedule: [],
  pmDriverSchedule: []
});
// ------------------Mutations-------------------------------
export const mutations = {
  addDriver(state, driver) {
    state.driverList.push(driver);
  },

  addDriverList(state, list) {
    state.driverList = list;
    // console.log(list)
  },
  fetchTodayAmDriver(state, list) {
    state.amDriverSchedule = list;
  },
  fetchTodayPmDriver(state, list) {
    state.pmDriverSchedule = list;
  },

  clearTodayAmDriver(state) {
    state.amDriverSchedule = [];
  },
  clearTodayPmDriver(state) {
    state.pmDriverSchedule = [];
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
  },

  // schedule--------------------------------------------------------------------------
  async saveTodayAmDriver({ rootState, commit }, list) {
    // console.log(list);
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayAmDriver")
      .set({
        ...list.todayAmDriver
      });
  },
  async saveTodayPmDriver({ rootState, commit }, list) {
    console.log(list);
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayPmDriver")
      .set({
        ...list.todayPmDriver
      });
  },

  async fetchTodayAmDriver({ rootState, commit }, today) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(today)
      .doc("todayAmDriver")
      .get();
    const lists = listRef.data();
    if (lists) {
      // console.log("fetch" + lists);
      commit("fetchTodayAmDriver", lists);
    } else {
      commit("clearTodayAmDriver");
      // console.log("fetch" + "error");
      return;
    }
  },
  async copyAmDriver({ rootState, commit }, today) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(today)
      .doc("todayAmDriver")
      .get();
    const lists = listRef.data();
    if (lists) {
      console.log("fetch" + lists);
      commit("fetchTodayPmDriver", lists);
    } else {
      // commit("clearTodayDriver");
      console.log("fetch" + "error");
      return;
    }
  },
  async fetchTodayPmDriver({ rootState, commit }, today) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(today)
      .doc("todayPmDriver")
      .get();
    const lists = listRef.data();
    if (lists) {
      // console.log("fetch" + lists);
      commit("fetchTodayPmDriver", lists);
    } else {
      commit("clearTodayPmDriver");
      // console.log("fetch" + "error");
      return;
    }
  }
};

// -----------------------Getters-------------------------
export const getters = {
  fetchDriverList: state => {
    return state.driverList;
  },

  driverSchedule: state => {
    return state.driverSchedule;
  }
};
