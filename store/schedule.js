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

  todayUsers(state, list) {
    // console.log(list);
    if (list) {
      // console.log(list);
      const lists = Object.keys(list).map(function(key) {
        return list[key];
      });
      state.todayUsers = lists;
      // console.log(state.todayUsers);
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
  },

  todayAbsenceUser(state, list) {
    if (list) {
      // 配列に変換。変換しないとオブジェクトで渡されてしまい、配列じゃない！とエラーが出る
      const lists = Object.keys(list).map(function(key) {
        return list[key];
      });
      state.absenceUser = lists;
    } else {
      state.absenceUser = [];
      console.log("errer");
      return;
    }
  },

  todayFamilyTransfer(state, list) {
    if (list) {
      // 配列に変換。変換しないとオブジェクトで渡されてしまい、配列じゃない！とエラーが出る
      const lists = Object.keys(list).map(function(key) {
        return list[key];
      });
      // console.log(lists);
      state.familyTransfer = lists;
    } else {
      state.familyTransfer = [];
      return;
    }
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
    // console.log(list);
    await fbstore
      .collection(list.day)
      .doc("todayFamilyTransfer")
      .set({
        ...list.familyTransferList
      });
  },

  async saveTodayAbsenceUser({ commit }, list) {
    // console.log(list);
    await fbstore
      .collection(list.day)
      .doc("todayAbsenceUser")
      .set({
        ...list.absenceUserList
      });
  },

  async saveTodayUsers({ commit }, list) {
    // console.log(list);
    await fbstore
      .collection(list.day)
      .doc("todayUsers")
      .set({
        ...list.todayUsersList
      });
  },
  // fetch-------------------------------------------------------------

  async fetchTodayAmTransferOderLists({ rootState, commit }, data) {
    const listRef = await fbstore
      .collection("adminUser")
      .doc(data.uid)
      .collection(data.today)
      .doc("todayAmTransferOderLists")
      .get();
    const lists = listRef.data();
    // .then(snapshot => {
    //   list.push(snapshot.data());
    // console.log(lists);
    if (lists) {
      // console.log(lists);
      commit("fetchTodayAmTransferOderLists", lists);
    } else {
      const carList = rootState.car.carList;
      commit("clearTodayAmTransferOderLists", carList);
      // console.log("error");
      return;
    }
  },

  async fetchTodayUsers({ commit }, data) {
    console.log(data);
    const listRef = await fbstore
      .collection("adminUser")
      .doc(data.uid)
      .collection(data.today)
      .doc("todayUsers")
      .get();
    const lists = listRef.data();
    if (lists) {
      commit("todayUsers", lists);
    } else {
      const todayUsersList = [];
      await fbstore
        .collection("adminUser")
        .doc(data.uid)
        .collection("usersList")
        .where("dayOfWeek", "array-contains", data.day)
        .get()
        .then(snapShot => {
          snapShot.forEach(user => {
            // console.log(user.data())
            todayUsersList.push(user.data());
          });
        });
      commit("fetchTodayUsers", todayUsersList);
    }
  },

  async fetchAbsenceUser({ commit }, data) {
    console.log(data.today);
    console.log(data.uid);
    const listRef = await fbstore
      .collection("adminUser")
      .doc(data.uid)
      .collection(data.today)
      .doc("todayAbsenceUser")
      .get();
    const lists = listRef.data();
    commit("todayAbsenceUser", lists);
  },

  async fetchFamilyTransfer({ commit }, data) {
    const listRef = await fbstore
      .collection("adminUser")
      .doc(data.uid)
      .collection(data.today)
      .doc("todayFamilyTransfer")
      .get();
    const lists = listRef.data();
    commit("todayFamilyTransfer", lists);
  },

  async fetch({ commit, dispatch }, days) {
    const listRef = await fbstore
      .collection(days.today)
      .doc("todayUsers")
      .get();
    const lists = listRef.data();
    if (!lists) {
      this.$swal({
        title: "データがありません"
      });
      return;
    }
    const day = days.day;
    const today = days.today;
    dispatch("fetchAbsenceUser", today);
    dispatch("fetchTodayUsers", { day, today });
    dispatch("fetchFamilyTransfer", today);
    dispatch("fetchTodayAmTransferOderLists", today);
    this.dispatch("pmSchedule/fetchTodayPmUsers", { day, today });
    this.dispatch("pmSchedule/fetchPmFamilyTransfer", { day, today });
    this.dispatch("pmSchedule/fetchTodayPmTransferOderLists", today);
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
  },

  familyTransfer: state => {
    return state.familyTransfer;
  }
};
