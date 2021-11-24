<template>
  <v-app>
    <h1 class="text-center">車両管理</h1>

    <v-container>
      <v-row align="center">
        <v-col cols="2">
          <v-subheader justify="center">車両名</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="車両名を入力してください"
            v-model="car.name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-subheader class="text-center">定員数</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="定員数を入力してください"
            v-model="car.max"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn v-if="!editMode" @click="createCar">
        車両追加
      </v-btn>
      <v-btn v-else @click="saveCar">保存</v-btn>
    </v-container>
    <v-container>
      <v-simple-table fixed-header class="orange lighten-5">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left  orange lighten-3">
                車両名
              </th>
              <th class="text-rigth text-center orange lighten-3">
                定員数
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
            <tr v-for="(car, i) in carList" :key="i">
              <td>{{ car.name }}</td>

              <td align="center">{{ car.max }}</td>

              <td align="center">
                <v-btn @click="editCar(i)">編集</v-btn>
              </td>
              <td align="center"><v-btn @click="deleteCar(i)">削除</v-btn></td>
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
    await this.$store.dispatch("car/getCarList");
  },

  data: () => ({
    car: {
      name: "",
      max: "",
      id: "",
      index: ""
    },
    // carList: [],
    editMode: false,
    uid: ""
  }),

  methods: {
    createCar() {
      if (!this.car.name || !this.car.max) {
        alert("車両名、定員数、どちらも入力してください");
        return;
      }
      const uid = this.uid;
      const car = { ...this.car };
      this.$store.dispatch("car/createCar", { car, uid });
      this.car.name = "";
      this.car.max = "";
    },

    editCar(i) {
      this.editMode = true;
      this.car.name = this.carList[i].name;
      this.car.max = this.carList[i].max;
      this.car.id = this.carList[i].id;
      this.car.index = i;
    },

    async saveCar() {
      if (!this.car.name || !this.car.max) {
        alert("車両名、定員数、どちらも入力してください");
        return;
      }
      const car = { ...this.car };
      // console.log(car);
      await this.$store
        .dispatch("car/saveCar", car)
        .then(
          (this.car.name = ""),
          (this.car.max = ""),
          (this.editMode = false)
        );
    },

    async deleteCar(i) {
      this.$swal({
        title: "車両情報を削除しますか？",
        text: "削除した場合、復元することはできません",
        icon: "warning",
        showCancelButton: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete.value) {
          this.car.id = this.carList[i].id;
          this.$store.dispatch("car/deleteCar", this.car.id);
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
    carList() {
      console.log(this.$store.state.car.carList);
      return this.$store.getters["car/fetchCarList"];
    }
  }
};
</script>
