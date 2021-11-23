<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <div id="firebase-authui"></div>
    </v-card>
  </v-app>
</template>

<script>
import firebase from "@/plugins/firebase";
import "firebaseui/dist/firebaseui.css";
// import * as firebaseui from "firebaseui";

export default {
  layout: "auth",
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, photoURL } = user;
        this.$store.commit("login/setLoginUser", {
          uid,
          displayName,
          photoURL
        });
        if (this.$router.currentRoute.name === "login")
          this.$router.push({ name: "/" });
      } else {
        this.$store.commit("login/logout");
        this.$router.push({ name: "login" });
      }
    });
  },
  // mounted() {
  //   const firebaseui = require("firebaseui");
  //   const uiConfig = {
  //     signInOptions: [
  //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //       firebase.auth.FacebookAuthProvider.PROVIDER_ID
  //     ]
  //   };
  //   if (firebaseui.auth.AuthUI.getInstance()) {
  //     const ui = firebaseui.auth.AuthUI.getInstance();
  //     ui.start("#firebase-authui", uiConfig);
  //   } else {
  //     const ui = new firebaseui.auth.AuthUI(firebase.auth());
  //     ui.start("#firebase-authui", uiConfig);
  //   }
  // }

  mounted() {
    const auth = firebase.auth();
    auth.languageCode = "ja";
    const firebaseui = require("firebaseui");

    if (location.pathname === "/login") {
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebase-authui", {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult: () => {
            return true;
          }
        },
        signInSuccessUrl: "/",
        privacyPolicyUrl: "/policy"
      });
    }
  }
};
</script>

<style></style>
