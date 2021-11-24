<template>
  <v-app>
    <h1 class="text-center">ドライバー管理</h1>

    <v-container>
      <v-row align="center">
        <v-col cols="2">
          <v-subheader justify="center">表示名</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="送迎表に表示する名前を入力してください"
            v-model="driver.displayName"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-subheader class="text-center">ドライバー名</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="ドライバーの名前を入力してください"
            v-model="driver.name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn v-if="!editMode" @click="createDriver">
        ドライバー追加
      </v-btn>
      <v-btn v-else @click="saveCar">保存</v-btn>
    </v-container>
    <v-container>
      <v-simple-table fixed-header class="orange lighten-5">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left orange lighten-3">
                ドライバー名
              </th>
              <th class="text-rigth text-center orange lighten-3">
                表示名
              </th>
              <th class="text-rigth text-center orange lighten-3">
                ー
              </th>
              <th class="text-rigth text-center orange lighten-3">
                ー
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(driver, i) in driverList" :key="i">
              <td>{{ driver.name }}</td>

              <td align="center">{{ driver.displayName }}</td>

              <td align="center">
                <v-btn @click="editDriver(i)">編集</v-btn>
              </td>
              <td align="center">
                <v-btn @click="deleteDriver(i)">削除</v-btn>
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
  async created() {
    const uid = this.$store.state.login.loginUser.uid;
    this.uid = uid;
    this.$store.dispatch("driver/getDriverList");
  },

  data: () => ({
    driver: {
      name: "",
      displayName: "",
      id: "",
      index: ""
    },
    // driverList: [],
    editMode: false,
    uid: ""
  }),

  methods: {
    createDriver() {
      if (!this.driver.name || !this.driver.displayName) {
        alert("表示名、ドライバー名、どちらも入力してください");
        return;
      }
      const driverList = [...this.driverList];
      const driverName = driverList.filter(
        driver => driver.displayName == this.driver.displayName
      );
      if (driverName.length != 0) {
        this.$swal({
          title: "同じ表示名のドライバー",
          text: "既に存在する表示名を登録することはできません",
          icon: "warning",
          dangerMode: true
        });
        return;
      }
      const driver = { ...this.driver };
      const uid = this.uid;
      this.$store.dispatch("driver/createDriver", { driver, uid });
      this.driver.name = "";
      this.driver.displayName = "";
    },

    editDriver(i) {
      this.editMode = true;
      this.driver.name = this.driverList[i].name;
      this.driver.displayName = this.driverList[i].displayName;
      this.driver.id = this.driverList[i].id;
      this.driver.index = i;
    },

    async saveCar() {
      if (!this.driver.name || !this.driver.displayName) {
        alert("表示名、ドライバー名、どちらも入力してください");
        return;
      }
      const driverList = [...this.driverList];
      const driverName = driverList.filter(
        driver => driver.displayName == this.driver.displayName
      );
      if (driverName.length != 0) {
        this.$swal({
          title: "同じ表示名のドライバー",
          text: "既に存在する表示名を登録することはできません",
          icon: "warning",
          dangerMode: true
        });
        return;
      }
      const driver = { ...this.driver };
      console.log(driver);
      await this.$store
        .dispatch("driver/saveDriver", driver)
        .then(
          (this.driver.name = ""),
          (this.driver.displayName = ""),
          (this.editMode = false)
        );
    },

    async deleteDriver(i) {
      this.$swal({
        title: "ドライバー情報を削除しますか？",
        text: "削除した場合、復元することはできません",
        icon: "warning",
        showCancelButton: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete.value) {
          this.driver.id = this.driverList[i].id;
          this.$store.dispatch("driver/deleteDriver", this.driver.id);
          this.$swal("削除しました。", {
            icon: "success"
          });
        } else {
          this.$swal("取り消しました。");
        }
      });
    }
  },

  computed: {
    driverList() {
      return this.$store.getters["driver/fetchDriverList"];
    }
  }
};
</script>
