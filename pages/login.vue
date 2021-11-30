<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-container>
      <v-row justify="center" class="mt-12">
        <v-col cols="5">
          <v-card>
            <v-card-title class="justify-center text-h3">
              送迎くん
            </v-card-title>
            <v-img v-bind:src="image_src"></v-img>

            <v-card-title class="justify-center subtitle-1">
              簡易送迎表作成アプリ<br />送迎くんです！<br />下記のログイン方法からお選びください
            </v-card-title>
            <v-card-title width="220px" class="py-1 justify-center" flat>
              <v-btn
                class="ml-6"
                width="220px"
                @click="guestLogin"
                color="primary"
                >ゲストログイン</v-btn
              >
            </v-card-title>
            <v-card id="firebase-authui" class="py-1 justify-center" flat>
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
  data() {
    return {
      image_src: require("@/static/illustrain10-norimono17.png")
    };
  },
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
      signInSuccessUrl: "/",
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
  },

  methods: {
    guestLogin() {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.$config.email, this.$config.pass)
            .then(userCredential => {
              // ログイン成功時の処理
              console.log(userCredential);
              window.alert("ログインしました");
              this.$router.push({ name: "index" });
            })
            .catch(error => {
              window.alert("ログインに失敗しました");
              console.log(error);
            });
        });
    }
  }
};
</script>

<style></style>
