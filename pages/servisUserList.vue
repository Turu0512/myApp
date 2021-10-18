<template>
  <v-app>
    <h1 class="text-center">利用者一覧</h1>
    <v-container>
      <v-row class="d-flex justify-center d-inline-block">
        <v-col cols="3">
          <v-text-field label="利用者検索" type="text">
            <template v-slot:append-outer>
              <v-btn color="primary">検索</v-btn>
            </template>
          </v-text-field>
        </v-col>

        <v-radio-group row class="pa-4 mt-6 ml-5">
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
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                名前
              </th>
              <th class="text-rigth text-center">
                性別
              </th>
              <th class="text-rigth text-center">
                住所
              </th>
              <th class="text-rigth text-center">
                利用日
              </th>
              <th class="text-rigth text-center">
                ー
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.name">
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
  async mounted() {
    await this.$store.dispatch("user/getUsersList");
  },

  data: () => ({
    items: [
      { week: "月" },
      { week: "火" },
      { week: "水" },
      { week: "木" },
      { week: "金" },
      { week: "土" },
      { week: "日" }
    ]
  }),

  computed: {
    users() {
      return this.$store.getters["user/users"];
    }
  },

  methods: {
    editUser(user) {
      console.log(user.id);
      this.$router.push({ name: "user-id", params: { id: user.id } });
    }
  }
};
</script>
