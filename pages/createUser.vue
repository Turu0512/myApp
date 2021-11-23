<template>
  <v-app>
    <h1 class="text-center">利用者登録</h1>

    <v-container>
      <v-row align="center">
        <v-col cols="2" class="pa-0" align="center">
          <v-subheader class="d-inline-block pa-4" align="center"
            >表示名</v-subheader
          >
        </v-col>
        <v-col cols="5">
          <v-text-field
            label="送迎表に表示する名前を入力してください"
            placeholder="例：送迎"
            v-model="users.displayName"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="2">
          <v-subheader justify="center">姓</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="姓を入力してください"
            placeholder="例：送迎"
            v-model="users.firstName"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-subheader class="text-center">名</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="名を入力してください"
            placeholder="例：太郎"
            v-model="users.lastName"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="2">
          <v-subheader justify="center">姓（フリガナ）</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="フリガナ"
            placeholder="例：ソウゲイ"
            v-model="users.firstNameRuby"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-subheader class="text-center">名（フリガナ）</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="フリガナ"
            placeholder="例：タロウ"
            v-model="users.lastNameRuby"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="2">
          <v-subheader>性別</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-select :items="sex" label="性別" v-model="users.sex"></v-select>
        </v-col>

        <v-col cols="2">
          <v-subheader class="text-center">住所</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="住所"
            placeholder="例：○ ○ 地区"
            v-model="users.address"
          ></v-text-field>
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
            v-model="users.dayOfWeek"
          ></v-checkbox>
        </div>
      </v-row>

      <v-row class="justify-center mt-10">
        <v-btn @click="cancel" class="mr-5">戻る</v-btn>

        <v-btn @click="createUser" class="ml-5">登録</v-btn>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
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

    users: {
      displayName: "",
      lastName: "",
      firstName: "",
      lastNameRuby: "",
      firstNameRuby: "",
      sex: "",
      address: "",
      dayOfWeek: [],
      transfers: ""
    }
  }),

  methods: {
    createUser() {
      if (
        this.users.displayName &&
        this.users.lastName &&
        this.users.firstName &&
        this.users.dayOfWeek
      ) {
        const daysOfWeek = ["月", "火", "水", "木", "金", "土", "日"];
        let dayOfWeek = this.users.dayOfWeek;
        dayOfWeek = dayOfWeek.sort(
          (a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
        );
        this.users.dayOfWeek = dayOfWeek;
        const user = { ...this.users };
        this.$store.dispatch("user/addUser", user);
        this.users.displayName = "";
        this.users.firstName = "";
        this.users.lastName = "";
        this.users.firstNameRuby = "";
        this.users.lastNameRuby = "";
        this.users.sex = "";
        this.users.address = "";
        this.users.dayOfWeek = [];
        this.users.transfers = "";
      } else {
        alert("表示名、姓、名、利用日は必ず入力してください");
        return;
      }
    },
    cancel() {
      this.$swal({
        title: "利用者一覧に戻りますか？",
        icon: "warning",
        showCancelButton: true,
        dangerMode: true
      }).then(ok => {
        if (ok.value) {
          this.$router.push({ name: "servisUserList" });
        } else {
          return;
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
