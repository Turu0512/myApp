import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export default function({ redirect, store, route, from }) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const { uid, displayName, photoURL } = user;
      // console.log("middleware: " + uid);
      fbstore
        .collection("adminUser")
        .doc(uid)
        .set({ name: displayName, uid: uid });
      store.commit("login/setLoginUser", {
        uid,
        displayName,
        photoURL
      });
    } else if (from.path === "/login") {
      return;
    } else if (route.path !== "/login") {
      redirect("/login");
    }
  });
}
// }
