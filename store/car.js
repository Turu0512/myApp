import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export const state = () => ({
  carList: [],
  pmCarList: [],
  amCarList: []
});
// ------------------Mutations-------------------------------
export const mutations = {
  addCar(state, car) {
    state.carList.push(car);
  },

  addCarList(state, list) {
    state.carList = list;
    // console.log(list)
  },
  addAmCarList(state, list) {
    state.amCarList = list;
    console.log(list);
  },
  addPmCarList(state, list) {
    state.pmCarList = list;
    console.log("pm" + list);
  }
};

// --------------------Actions-------------------------
export const actions = {
  async createCar({ commit, dispatch }, data) {
    await fbstore
      .collection("adminUser")
      .doc(data.uid)
      .collection("carList")
      .add({})
      .then(res => {
        fbstore
          .collection("adminUser")
          .doc(data.uid)
          .collection("carList")
          .doc(res.id)
          .set({
            ...data.car,
            id: res.id,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            commit("addCar", data.car);
            dispatch("getCarList");
          });
      });
  },

  async getCarList({ rootState, commit }) {
    const list = [];
    const uid = rootState.login.loginUser.uid;
    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("carList")
      .orderBy("timestamp")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => list.push(doc.data()));
      });
    // commit("addCarList", list);
    commit("addAmCarList", list);
    commit("addPmCarList", list);
  },

  saveCar({ rootState, commit, dispatch }, car) {
    const uid = rootState.login.loginUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("carList")
      .doc(car.id)
      .set({
        car,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    dispatch("getCarList");
  },

  deleteCar({ rootState, commit, dispatch }, id) {
    const uid = rootState.login.loginUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("carList")
      .doc(id)
      .delete()
      .then(() => {
        console.log(id);
        console.log("Document successfully deleted!");
        dispatch("getCarList");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  },

  async fetchTodayAmCarList({ rootState, commit, dispatch }, today) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(today)
      .doc("todayAmCarList")
      .get();
    const lists = listRef.data();
    if (lists) {
      console.log("hakka");
      commit("addAmCarList", lists);
    } else {
      dispatch("getCarList");
      console.log("fetch" + "error");
      return;
    }
  },
  async fetchTodayPmCarList({ rootState, commit, dispatch }, today) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(today)
      .doc("todayPmCarList")
      .get();
    const lists = listRef.data();
    if (lists) {
      console.log("fetch" + lists);
      commit("addPmCarList", lists);
    } else {
      dispatch("getCarList");
      console.log("fetch" + "error");
      return;
    }
  },

  async saveTodayAmCarList({ rootState, commit }, list) {
    const uid = rootState.login.loginUser.uid;
    // console.log(uid);

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayAmCarList")
      .set({
        ...list.amCarList
      });
  },
  async saveTodayPmCarList({ rootState, commit }, list) {
    const uid = rootState.login.loginUser.uid;
    console.log(uid);

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayPmCarList")
      .set({
        ...list.pmCarList
      });
  }
};

// -----------------------Getters-------------------------
export const getters = {
  fetchCarList: state => {
    return state.carList;
  }
};
