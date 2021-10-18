import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export const state = () => ({
  carList: []
});
// ------------------Mutations-------------------------------
export const mutations = {
  addCar(state, car) {
    console.log(car);
    state.carList.push(car);
  },

  addCarList(state, list) {
    state.carList = list;
    // console.log(list)
  }
};

// --------------------Actions-------------------------
export const actions = {
  async createCar({ commit }, car) {
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
            console.log(car, res.id);
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
  }
};

// -----------------------Getters-------------------------
export const getters = {
  fetchCarList: state => {
    return state.carList;
  }
};
