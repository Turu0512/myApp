import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export const state = () => ({
  pmTransferOderLists: [],
  pmFamilyTransfer: [],
  absenceUser: [],
  todayPmUsers: [],
  eventData: []
});
// ------------------Mutations-------------------------------
export const mutations = {
  addCar(state, car) {
    // console.log(car);
    state.carList.push(car);
  },

  fetchTodayPmTransferOderLists(state, list) {
    state.pmTransferOderLists = list;
    // console.log(list);
  },

  fetchTodayPmUsers(state, todayUser) {
    // console.log(todayUser);
    state.todayPmUsers = _.sortBy(todayUser, user => {
      return user.firstNameRuby;
    });
  },

  todayPmUsers(state, list) {
    // console.log(list);
    if (list) {
      // console.log(list);
      const lists = Object.keys(list).map(function(key) {
        return list[key];
      });
      state.todayPmUsers = lists;
      // console.log(state.todayPmUsers);
    } else {
      // console.log(state.absenceUser);
      return;
    }
  },
  changeTodayPmUser(state, list) {
    let user = state.todayPmUsers;

    for (let i = 0; i < list.length; i++) {
      user = user.filter(a => a.id != list[i].id);
    }
    state.todayPmUsers = user;
  },

  // todayAbsenceUser(state, list) {
  //   if (list) {
  //     // 配列に変換。変換しないとオブジェクトで渡されてしまい、配列じゃない！とエラーが出る
  //     const lists = Object.keys(list).map(function(key) {
  //       return list[key];
  //     });
  //     // console.log(lists);
  //     state.absenceUser = lists;
  //   } else {
  //     state.absenceUser = [];
  //     return;
  //   }
  // },

  todayPmFamilyTransfer(state, list) {
    if (list) {
      // 配列に変換。変換しないとオブジェクトで渡されてしまい、配列じゃない！とエラーが出る
      const lists = Object.keys(list).map(function(key) {
        return list[key];
      });
      // console.log(lists);
      state.pmFamilyTransfer = lists;
    } else {
      state.pmFamilyTransfer = [];
      return;
    }
  },
  clearTodayAmTransferOderLists(state, list) {
    const newList = new Array();
    for (let i = 0; i < list.length; i++) {
      newList[i] = new Array();
    }
    state.pmTransferOderLists = newList;
  },

  fetchCalendarEvent(state, eventData) {
    state.eventData = eventData;
  }
};

// --------------------Actions-------------------------

export const actions = {
  async reverseSchedule({ rootState, commit }, day) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(day)
      .doc("todayAmTransferOderLists")
      .get();
    let lists = listRef.data();
    let pmList = Object.keys(lists).map(function(key) {
      return lists[key];
    });
    for (let i = 0; i < pmList.length; i++) {
      lists[i] = lists[i].reverse();
    }
    commit("todayPmFamilyTransfer", rootState.schedule.familyTransfer);
    commit("fetchTodayPmUsers", rootState.schedule.todayUsers);
    commit("fetchTodayPmTransferOderLists", pmList);
  },
  // Savelist--------------------------------------------------------------
  async saveTodayPmTransferOderLists({ rootState, commit }, list) {
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayPmTransferOderLists")
      .set({
        ...list.todayPmTransferOderLists
      });

    // console.log(list);
  },

  async saveTodayPmFamilyTransfer({ rootState, commit }, list) {
    // console.log(list);
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayPmFamilyTransfer")
      .set({
        ...list.pmFamilyTransferList
      });
  },

  // async saveTodayPmAbsenceUser({ rootState, commit }, list) {
  //   // console.log(list);
  //   const uid = rootState.login.loginUser.uid;

  //   await fbstore
  //     .collection("adminUser")
  //     .doc(uid)
  //     .collection(list.day)
  //     .doc("todayPmAbsenceUser")
  //     .set({
  //       ...list.absenceUserList
  //     });
  // },

  async saveTodayPmUsers({ rootState, commit }, list) {
    // console.log(list);
    const uid = rootState.login.loginUser.uid;

    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(list.day)
      .doc("todayPmUsers")
      .set({
        ...list.todayPmUsersList
      });
  },
  // fetch----------------------------------------------------------------------------

  async fetchTodayPmTransferOderLists({ rootState, commit }, day) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(day)
      .doc("todayPmTransferOderLists")
      .get();
    const lists = listRef.data();
    // .then(snapshot => {
    //   list.push(snapshot.data());
    // console.log(lists);
    if (lists) {
      console.log(lists);
      commit("fetchTodayPmTransferOderLists", lists);
    } else {
      const carList = rootState.car.carList;
      commit("clearTodayAmTransferOderLists", carList);
      // console.log("pmtr error");
      return;
    }
  },

  async fetchTodayPmUsers({ rootState, commit }, day) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(day.today)
      .doc("todayPmUsers")
      .get();
    const lists = listRef.data();
    if (lists) {
      commit("todayPmUsers", lists);
    } else {
      const todayUsersList = [];
      await fbstore
        .collection("adminUser")
        .doc(uid)
        .collection("usersList")
        .where("dayOfWeek", "array-contains", day.day)
        .get()
        .then(snapShot => {
          snapShot.forEach(user => {
            // console.log(user.data())
            todayUsersList.push(user.data());
          });
        });
      commit("fetchTodayPmUsers", todayUsersList);
    }
  },

  // async fetchAbsenceUser({ rootState, commit }, day) {
  //   const uid = rootState.login.loginUser.uid;

  //   const listRef = await fbstore
  //     .collection("adminUser")
  //     .doc(uid)
  //     .collection(day)
  //     .doc("todayAbsenceUser")
  //     .get();
  //   const lists = listRef.data();
  //   commit("todayAbsenceUser", lists);
  // },

  async fetchPmFamilyTransfer({ rootState, commit }, day) {
    const uid = rootState.login.loginUser.uid;

    const listRef = await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection(day.today)
      .doc("todayPmFamilyTransfer")
      .get();
    const lists = listRef.data();
    commit("todayPmFamilyTransfer", lists);
  },

  // CalendarEvent-----------------------------------------------------------
  saveCalendarEvent({ rootState, commit }, day) {
    const uid = rootState.login.loginUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("calendarEvent")
      .doc(day)
      .set({
        name: "作成済",
        start: day,
        color: "blue"
      });
  },
  temporarilySavedCalendarEvent({ rootState, commit }, day) {
    const uid = rootState.login.loginUser.uid;

    fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("calendarEvent")
      .doc(day)
      .set({
        name: "作成中",
        start: day,
        color: "red"
      });
  },

  async fetchCalendarEvent({ rootState, commit }) {
    const uid = rootState.login.loginUser.uid;
    const eventData = [];
    await fbstore
      .collection("adminUser")
      .doc(uid)
      .collection("calendarEvent")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => eventData.push(doc.data()));
      });
    // console.log(eventData);
    commit("fetchCalendarEvent", eventData);
  }
};
// -----------------------Getters-------------------------
export const getters = {
  pmTransferOderLists: state => {
    return state.pmTransferOderLists;
  },

  // absenceUser: state => {
  //   return state.absenceUser;
  // },

  todayPmUsers: state => {
    return state.todayPmUsers;
  },

  pmFamilyTransfer: state => {
    return state.pmFamilyTransfer;
  }
};
