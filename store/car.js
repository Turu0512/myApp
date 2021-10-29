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
  async createCar({ commit, dispatch }, car) {
    await fbstore
      .collection("carList")
      .add({})
      .then(res => {
        fbstore
          .collection("carList")
          .doc(res.id)
          .set({
            ...car,
            id: res.id,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
            commit("addCar", car);
            dispatch("getCarList");
          });
      });
  },

  async getCarList({ commit }) {
    const list = [];
    await fbstore
      .collection("carList")
      .orderBy("timestamp")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => list.push(doc.data()));
      });
    commit("addCarList", list);
  },

  saveCar({ commit, dispatch }, car) {
    fbstore
      .collection("carList")
      .doc(car.id)
      .set({
        ...car,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    dispatch("getCarList");
  },

  deleteCar({ commit, dispatch }, id) {
    fbstore
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
