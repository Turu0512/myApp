<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list-item>
        <v-list-item-title class="title">
          Application
        </v-list-item-title>
        <v-btn icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list nav>
        <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">
            Logout
          </v-btn>
        </div>
      </template>

      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app clippedLeft>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>送迎くん</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "@/plugins/firebase";
const fbstore = firebase.firestore();

export default {
  name: "App",
  data: () => ({
    drawer: false,
    menus: [
      { title: "利用者一覧", icon: "mdi-web", url: "/servisUserList" },
      { title: "送迎表", icon: "mdi-heart", url: "/schedule/schedule" },

      { title: "車両一覧", icon: "mdi-information-variant", url: "/car" },
      {
        title: "ドライバー  一覧",
        icon: "mdi-information-variant",
        url: "/about"
      }
    ]
  }),

  methods: {
    logout() {
      this.$store.dispatch("login/logoutFb");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
