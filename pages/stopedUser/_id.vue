<template>
  <v-app>
    <h1 class="text-center">中止者編集</h1>

    <v-container>
      <v-row align="center">
        <v-col cols="2" class="pa-0" align="center">
          <v-subheader class="d-inline-block pa-4" align="center"
            >表示名</v-subheader
          >
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="editUser.displayName"></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="2">
          <v-subheader justify="center">姓</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="editUser.firstName"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-subheader class="text-center">名</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="editUser.lastName"></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="2">
          <v-subheader justify="center">姓（フリガナ）</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="editUser.firstNameRuby"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-subheader class="text-center">名（フリガナ）</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="editUser.lastNameRuby"></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="2">
          <v-subheader>性別</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-select :items="sex" label="性別" v-model="editUser.sex"></v-select>
        </v-col>
        <v-col cols="2">
          <v-subheader class="text-center">住所</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="editUser.address"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-subheader class="text-center">利用日</v-subheader>
        </v-col>
        <div v-for="(item, i) in items" :key="i">
          <v-checkbox
            :label="item.week"
            :value="item.week"
            class="mr-7"
            v-model="editUser.dayOfWeek"
          ></v-checkbox>
        </div>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-subheader class="text-center">送迎</v-subheader>
        </v-col>

        <v-radio-group
          row
          v-for="(transfer, i) in transfers"
          :key="i"
          v-model="editUser.transfers"
        >
          <v-radio
            :id="transfer.label"
            :label="transfer.label"
            :value="transfer.label"
            class="mr-7"
          ></v-radio>
        </v-radio-group>
      </v-row>

      <!-- <v-row align="center">
        <v-col cols="2" class="pa-0" align="center">
          <v-subheader class="d-inline-block pa-4" align="center"
            >持参品</v-subheader
          >
        </v-col>
        <v-col cols="5">
          <v-text-field
            label="持参するものがあれば入力してください"
            placeholder="例：杖"
          ></v-text-field>
        </v-col> -->
      <!-- </v-row> -->

      <v-row>
        <v-col cols="2">
          <v-subheader class="text-center">中止</v-subheader>
        </v-col>
        <v-checkbox
          label="利用者一覧に名前が表示されなくなります"
          v-model="stoped"
        ></v-checkbox>
      </v-row>
      <v-row>
        <v-col cols="12" class="pl-12">
          ＊利用者一覧に再表示させる場合にはチェックを外してください
        </v-col>
      </v-row>
      <v-row class="justify-center mt-10">
        <v-btn @click="editUserSave">保存</v-btn>
        <v-btn class="ml-5" @click="deleteUser">削除</v-btn>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "@/plugins/firebase";

export default {
  async created() {
    const uid = "";
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        uid = user;
      }

      const id = this.$route.params.id;
      this.$store.dispatch("user/fetchStopUserData", { uid, id });
    });
  },
  // async created() {
  //   await this.$store.dispatch("user/fetchStopUserData", this.$route.params.id);
  //   console.log(this.$store.state.user.editUserData);
  //   const edit = this.$store.state.user.editUserData;
  //   edit.forEach(data => {
  //     this.editUser = { ...data };
  //   });

  data: () => ({
    sex: ["男", "女"],
    items: [
      { week: "月" },
      { week: "火" },
      { week: "水" },
      { week: "木" },
      { week: "金" },
      { week: "土" },
      { week: "日" }
    ],
    transfers: [
      { label: "送迎あり" },
      { label: "送迎なし" },
      { label: "途中送迎" }
    ],

    // editUser: {},
    uid: "",
    stoped: true
  }),
  computed: {
    editUser: {
      get() {
        return this.$store.getters["user/editUsersData"];
      },
      set() {}
    }
  },
  methods: {
    async editUserSave() {
      const daysOfWeek = ["月", "火", "水", "木", "金", "土", "日"];
      if (!this.stoped) {
        let editDayOfWeek = this.editUser.dayOfWeek;
        console.log(daysOfWeek);
        this.editUser.dayOfWeek = [...editDayOfWeek].sort(
          (a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
        );
        await this.$store.dispatch("user/returnUsersList", this.editUser);
        await this.$store.dispatch("user/deleteStopUser", this.editUser.id);
        this.editUser = "";
        this.$router.push({ name: "stopUser" });
      } else {
        let editDayOfWeek = this.editUser.dayOfWeek;
        this.editUser.dayOfWeek = [...editDayOfWeek].sort(
          (a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
        );
        await this.$store.dispatch("user/stopedUser", this.editUser);
        this.editUser = "";
        this.$router.push({ name: "stopUser" });
      }
    },

    deleteUser() {
      this.$swal({
        title: "利用者情報を削除しますか？",
        text: "削除した場合、復元することはできません",
        icon: "warning",
        showCancelButton: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete.value) {
          this.$store.dispatch("user/deleteStopUser", this.$route.params.id);
          this.$swal("削除しました。", {
            icon: "success"
          });
        } else {
          this.$swal("取り消しました。");
        }
      });
    }
  }
};
</script>

<style>
.v-subheader {
  justify-content: center;
}
</style>
