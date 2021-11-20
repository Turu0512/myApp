<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <div id="firebase-authui"></div>

      <!-- <v-card-title>
        <h1 class="display-1">新規登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="createUserEmail"
            label="ユーザー名"
          ></v-text-field>
          <v-text-field
            v-model="createUserPassword"
            label="パスワード"
          ></v-text-field>
        </v-form>
        <v-btn class="info" @click="createUser">登録する</v-btn>
      </v-card-text> -->
    </v-card>

    <!-- <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ログインしてください</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="email" label="ユーザー名"></v-text-field>
          <v-text-field v-model="password" label="パスワード"></v-text-field>
        </v-form>
        <v-btn class="info" @click="login">ログインする</v-btn>
      </v-card-text>
      <v-btn class="info" @click="googleLogin">googleでログインする</v-btn>
    </v-card> -->
  </v-app>
</template>

<script>
import firebase from "@/plugins/firebase";
import "firebaseui/dist/firebaseui.css";

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
  mounted() {
    const firebaseui = require("firebaseui");
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
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
  // data() {
  //   return {
  //     createUserEmail: "",
  //     createUserPassword: "",
  //     email: "",
  //     password: ""
  //   };
  // },

  methods: {
    //   createUser() {
    //     firebase
    //       .auth()
    //       .createUserWithEmailAndPassword(
    //         this.createUserEmail,
    //         this.createUserPassword
    //       )
    //       .then(userCredential => {
    //         // ログイン成功時の処理
    //         window.alert("登録しました");
    //       })
    //       .catch(error => {
    //         // ログイン失敗時の処理
    //         window.alert("登録に失敗しました");
    //         console.log(error);
    //       });
    //   },
    //   login() {
    //     firebase
    //       .auth()
    //       .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    //       .then(() => {
    //         firebase
    //           .auth()
    //           .signInWithEmailAndPassword(this.email, this.password)
    //           .then(userCredential => {
    //             // ログイン成功時の処理
    //             console.log(userCredential);
    //             window.alert("ログインしました");
    //           })
    //           .catch(error => {
    //             window.alert("ログインに失敗しました");
    //             console.log(error);
    //           });
    //       });
    //   },
  }
};
</script>

<style></style>
