<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-container>
      <v-row justify="center" class="mt-12">
        <v-col cols="5">
          <v-card>
            <v-card-title class="justify-center text-h3">
              送迎くん
            </v-card-title>
            <v-img src="illustrain10-norimono17.png"></v-img>

            <v-card-title class="justify-center subtitle-1">
              簡易送迎表作成アプリ<br />送迎くんへようこそ！<br />下記のログイン方法からお選びください
            </v-card-title>
            <v-card height="100%" id="firebase-authui" class="py-1" flat>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "@/plugins/firebase";
import "firebaseui/dist/firebaseui.css";

export default {
  layout: "auth",
  // created() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       const { uid, displayName, photoURL } = user;
  //       this.$store.commit("login/setLoginUser", {
  //         uid,
  //         displayName,
  //         photoURL
  //       });
  //       if (this.$router.currentRoute.name === "login")
  //         this.$router.push({ name: "servisUserList" });
  //     }
  //   });
  // },

  mounted() {
    const firebaseui = require("firebaseui");
    const uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/servisUserList",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    };
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance();
      ui.start("#firebase-authui", uiConfig);
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebase-authui", uiConfig);
    }
  }
};
</script>

<style></style>
