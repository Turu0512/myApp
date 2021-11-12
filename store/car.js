import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export const state = () => ({
  carList: [],
  car: "aaa"
});
// ------------------Mutations-------------------------------
export const mutations = {
  addCar(state, car) {
    state.carList.push(car);
  },

  addCarList(state, list) {
    state.carList = list;
    // console.log(list)
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
    commit("addCarList", list);
  },

  saveCar({ rootState, commit, dispatch }, car) {
    const uid = rootState.login.loginUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("carList")
      .doc(car.id)
      .set({
        ...car,
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
  }
};

// -----------------------Getters-------------------------
export const getters = {
  fetchCarList: state => {
    return state.carList;
  }
};
