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
              簡易送迎表作成アプリ<br />送迎くんへようこそ！
            </v-card-title>
            <v-card-title flat class="justify-center" @click="jump">
              <v-btn>送迎くんを始める</v-btn>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      image_src: require("@/static/illustrain10-norimono17.png")
    };
  },

  methods: {
    jump() {
      if (this.$store.state.login.loginUser) {
        this.$router.push("/servisUserList");
      } else {
        this.$router.push("/login/");
      }
    }
  }
};
</script>

<style></style>
