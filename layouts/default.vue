<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
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
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>

      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
  data: () => ({
    drawer: false,
    menus: [
      { title: '利用者一覧', icon: 'mdi-web', url: '/' },
      { title: '利用者登録', icon: 'mdi-home', url: '/home' },
      { title: '送迎表', icon: 'mdi-heart', url: '/favorites' },
      { title: '中止者一覧', icon: 'mdi-information-variant', url: '/about' },
      { title: '車両管理', icon: 'mdi-information-variant', url: '/about' },
      { title: '閲覧アカウント作成', icon: 'mdi-information-variant', url: '/about' }
    ]
  })
  }
  
</script>