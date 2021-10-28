<template>
  <v-app>
    <v-card>
      <v-card-title class="justify-center">
        車両管理
      </v-card-title>
    </v-card>
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
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                車両名
              </th>
              <th class="text-rigth text-center">
                定員数
              </th>
              <th class="text-rigth text-center">
                ー
              </th>
              <th class="text-rigth text-center">
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
// import firebase from "@/plugins/firebase";
// const fbstore = firebase.firestore();
export default {
  async mounted() {
    await this.$store.dispatch("car/getCarList");
    // await fbstore
    //   .collection("carList")
    //   .orderBy("timestamp")
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => this.carList.push(doc.data()));
    //   });
  },

  data: () => ({
    car: {
      name: "",
      max: "",
      id: "",
      index: ""
    },
    // carList: [],
    editMode: false
  }),

  methods: {
    createCar() {
      if (!this.car.name || !this.car.max) {
        alert("車両名、定員数、どちらも入力してください");
        return;
      }
      const car = { ...this.car };
      this.$store.dispatch("car/createCar", car);
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

    saveCar() {
      if (!this.car.name || !this.car.max) {
        alert("車両名、定員数、どちらも入力してください");
        return;
      }
      //  else if (
      //   this.car.name == this.carList[this.car.index].name ||
      //   this.car.max == this.carList[this.car.index].max
      // )
      // {
      //   console.log("一緒");
      //   return;
      // }
      const car = { ...this.car };
      console.log(car);
      this.$store.dispatch("car/saveCar", car);
      this.car.name = "";
      this.car.max = "";
      this.editMode = false;
      this.$store.dispatch("car/getCarList");
    },

    deleteCar(i) {
      this.car.id = this.carList[i].id;
      this.$store.dispatch("car/deleteCar", this.car.id);
      this.$store.dispatch("car/getCarList");
    }
  },

  computed: {
    carList() {
      return this.$store.getters["car/fetchCarList"];
    }
  }
};
</script>
