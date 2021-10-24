import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export const state = () => ({
  amTransferOderLists: [],
  familyTransfer: [],
  absenceUser: [],
  todayUsers: []
});
// ------------------Mutations-------------------------------
export const mutations = {
  addCar(state, car) {
    // console.log(car);
    state.carList.push(car);
  },

  fetchTodayAmTransferOderLists(state, list) {
    state.amTransferOderLists = list;
    // console.log(list);
  },

  clearTodayAmTransferOderLists(state, list) {
    const newList = new Array();
    for (let i = 0; i < list.length; i++) {
      newList[i] = new Array();
    }
    state.amTransferOderLists = newList;
  },

  todayAbsenceUser(state, list) {
    // console.log(list);
    // const newList = new Array();
    // state.absenceUser = newList;
    if (list) {
      // 配列に変換。変換しないとオブジェクトで渡されてしまい、配列じゃない！とエラーが出る
      const lists = Object.keys(list).map(function(key) {
        return list[key];
      });
      console.log(lists);
      state.absenceUser = lists;
    } else {
      state.absenceUser = [];
      return;
    }
  },

  todayUsers(state, list) {
    // console.log(list);
    if (list) {
      // console.log(list);
      const lists = Object.keys(list).map(function(key) {
        return list[key];
      });
      state.todayUsers = lists;
      console.log(state.todayUsers);
    } else {
      // console.log(state.absenceUser);
      return;
    }
  },

  fetchTodayUsers(state, todayUser) {
    state.todayUsers = _.sortBy(todayUser, user => {
      return user.firstNameRuby;
    });

    // console.log();
  }
};

// --------------------Actions-------------------------
// Savelist---------------------------------------------------------
export const actions = {
  async saveTodayAmTransferOderLists({ commit }, list) {
    await fbstore
      .collection(list.day)
      .doc("todayAmTransferOderLists")
      .set({
        ...list.todayAmTransferOderLists
      });

    // console.log(list);
  },

  async saveTodayFamilyTransfer({ commit }, list) {
    console.log(list);
    await fbstore
      .collection(list.day)
      .doc("todayFamilyTransfer")
      .set({
        ...list.familyTransferList
      });
  },

  async saveTodayAbsenceUser({ commit }, list) {
    console.log(list);
    await fbstore
      .collection(list.day)
      .doc("todayAbsenceUser")
      .set({
        ...list.absenceUserList
      });
  },

  async saveTodayUsers({ commit }, list) {
    console.log(list);
    await fbstore
      .collection(list.day)
      .doc("todayUsers")
      .set({
        ...list.todayUsersList
      });
  },
  // fetch-------------------------------------------------------------

  async fetchTodayAmTransferOderLists({ rootState, commit }, day) {
    const listRef = await fbstore
      .collection(day)
      .doc("todayAmTransferOderLists")
      .get();
    const lists = listRef.data();
    // .then(snapshot => {
    //   list.push(snapshot.data());
    // console.log(lists);
    if (lists) {
      console.log(lists);
      commit("fetchTodayAmTransferOderLists", lists);
    } else {
      const carList = rootState.car.carList;
      commit("clearTodayAmTransferOderLists", carList);
      // console.log("error");
      return;
    }
  },

  async fetchAbsenceUser({ commit }, day) {
    const listRef = await fbstore
      .collection(day)
      .doc("todayAbsenceUser")
      .get();
    const lists = listRef.data();
    commit("todayAbsenceUser", lists);
  },

  async fetchTodayUsers({ commit }, day) {
    const listRef = await fbstore
      .collection(day.today)
      .doc("todayUsers")
      .get();
    const lists = listRef.data();
    commit("todayUsers", lists);
    if (!lists) {
      const todayUsersList = [];
      await fbstore
        .collection("usersList")
        .where("dayOfWeek", "array-contains", day.day)
        .get()
        .then(snapShot => {
          snapShot.forEach(user => {
            // console.log(user.data())
            todayUsersList.push(user.data());
          });
        });
      commit("fetchTodayUsers", todayUsersList);
    }
  }
};
// -----------------------Getters-------------------------
export const getters = {
  amTransferOderLists: state => {
    return state.amTransferOderLists;
  },

  absenceUser: state => {
    return state.absenceUser;
  },

  todayUsers: state => {
    return state.todayUsers;
  }
};
