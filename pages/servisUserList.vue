<template>
  <v-app>
    <h1 class="text-center mt-5">利用者一覧</h1>
    <v-container>
      <v-col>
        <v-btn small class="ma-4" @click="toCreateUserPage">
          利用者登録
        </v-btn>
        <v-btn small class="ma-4" @click="toStopUserPage">
          利用中止者一覧
        </v-btn>
      </v-col>
      <v-row class="d-flex justify-center d-inline-block">
        <v-col cols="3">
          <v-text-field
            label="検索(名前orフリガナ)"
            type="text"
            v-model="filterName"
          >
          </v-text-field>
        </v-col>

        <v-radio-group row class="pa-4 mt-6 ml-5" v-model="dayOfWeek">
          <v-radio
            v-for="item in items"
            :key="item.index"
            :label="item.week"
            :value="item.week"
          ></v-radio>
        </v-radio-group>
      </v-row>
    </v-container>

    <v-container>
      <v-simple-table fixed-header height="100%" class="orange lighten-5">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left  orange lighten-3">
                名前
              </th>
              <th class="text-rigth text-center orange lighten-3">
                性別
              </th>
              <th class="text-rigth text-center orange lighten-3">
                住所
              </th>
              <th class="text-rigth text-center orange lighten-3">
                利用日
              </th>
              <th class="text-rigth text-center orange lighten-3">
                ー
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in newUsersList" :key="user.name">
              <td>{{ user.firstName + " " + user.lastName }}</td>
              <td align="center">{{ user.sex }}</td>
              <td align="center">{{ user.address }}</td>
              <td align="center">
                <span
                  v-for="dayOfWeek in user.dayOfWeek"
                  :key="dayOfWeek"
                  class="pa-1"
                >
                  {{ dayOfWeek }}
                </span>
              </td>
              <td align="center">
                <v-btn @click="editUser(user)">編集</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-app>
</template>

<script>
export default {
  created() {
    const uid = this.$store.state.login.loginUser.uid;
    this.$store.dispatch("user/getUsersList", uid);
  },

  data: () => ({
    items: [
      { week: "全て" },
      { week: "月" },
      { week: "火" },
      { week: "水" },
      { week: "木" },
      { week: "金" },
      { week: "土" },
      { week: "日" }
    ],

    filterName: "",
    dayOfWeek: ""
  }),

  computed: {
    users() {
      return this.$store.getters["user/users"];
    },

    newUsersList() {
      return this.users
        .filter(item => {
          return (
            item.firstName.includes(this.filterName) ||
            item.lastName.includes(this.filterName) ||
            item.firstNameRuby.includes(this.filterName) ||
            item.lastNameRuby.includes(this.filterName)
          );
        })
        .filter(item => {
          if (!this.dayOfWeek || this.dayOfWeek == "全て") {
            return this.users;
          }
          return item.dayOfWeek.includes(this.dayOfWeek);
        });
    }
  },

  methods: {
    toCreateUserPage() {
      this.$router.push({ name: "createUser" });
    },
    toStopUserPage() {
      this.$router.push({ name: "stopUser" });
    },
    editUser(user) {
      this.$router.push({ name: "user-id", params: { id: user.id } });
    }
  }
};
</script>
