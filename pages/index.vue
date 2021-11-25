<template>
  <div></div>
</template>
<script>
import firebase from "@/plugins/firebase";

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
          this.$router.push({ name: "servisUserList" });
      } else {
        this.$store.commit("login/logout");
        this.$router.push({ name: "login" });
      }
    });
  }
};
</script>
