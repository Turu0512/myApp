<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.light.background }"
  >
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      class="noprint"
      color="grey lighten-4"
    >
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
          <v-btn block @click="logout" color="white">
            Logout
          </v-btn>
        </div>
      </template>

      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app clippedLeft class="noprint" color="accent">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>送迎くん</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view @drawer="drawer = false" class="mt-5"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import moment from "moment";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    menus: [
      {
        title: "利用者一覧",
        icon: "mdi-account-group",
        url: "/servisUserList"
      },
      {
        title: "送迎表",
        icon: "mdi-application-edit-outline",
        url: {
          name: "schedule-id",
          params: { id: moment().format("yyyy-MM-DD") }
        },
        action: "toSchedule"
      },

      { title: "車両管理", icon: "mdi-car", url: "/car" },
      {
        title: "ドライバー管理",
        icon: "mdi-account-circle-outline",
        url: "/driver"
      }
    ]
  }),

  methods: {
    logout() {
      this.$store.dispatch("login/logoutFb");
      this.$router.push({ name: "login" });
    },
    toSchedule() {
      console.log(value);
    }
  }
};
</script>
