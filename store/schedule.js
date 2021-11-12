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
      // console.log("errer");
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
  async saveTodayAmTransferOderLists({ rootState, commit }, list) {
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayAmTransferOderLists")
      .set({
        ...list.todayAmTransferOderLists
      });

    // console.log(list);
  },

  async saveTodayFamilyTransfer({ rootState, commit }, list) {
    // console.log(list);
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayFamilyTransfer")
      .set({
        ...list.familyTransferList
      });
  },

  async saveTodayAbsenceUser({ rootState, commit }, list) {
    // console.log(list);
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayAbsenceUser")
      .set({
        ...list.absenceUserList
      });
  },

  async saveTodayUsers({ rootState, commit }, list) {
    // console.log(list);
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayUsers")
      .set({
        ...list.todayUsersList
      });
  },
  // fetch-------------------------------------------------------------

  async fetchTodayAmTransferOderLists({ rootState, commit }, today) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(today)
      .doc("todayAmTransferOderLists")
      .get();
    const lists = listRef.data();
    if (lists) {
      console.log("fetch" + lists);
      commit("fetchTodayAmTransferOderLists", lists);
    } else {
      const carList = rootState.car.carList;
      commit("clearTodayAmTransferOderLists", carList);
      // console.log("fetch" + "error");
      return;
    }
  },

  async fetchTodayUsers({ rootState, commit }, data) {
    const uid = rootState.login.loginUser.uid;
    console.log(uid);

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
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
        .doc(uid)
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

  async fetchAbsenceUser({ rootState, commit }, today) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(today)
      .doc("todayAbsenceUser")
      .get();
    const lists = listRef.data();
    commit("todayAbsenceUser", lists);
  },

  async fetchFamilyTransfer({ rootState, commit }, today) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(today)
      .doc("todayFamilyTransfer")
      .get();
    const lists = listRef.data();
    commit("todayFamilyTransfer", lists);
  },

  async fetch({ rootState, commit, dispatch }, days) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
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
