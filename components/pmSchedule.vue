<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="10">
          <h1 class="subtitle-1">
            送り
          </h1>
          <!-- -------------------main---------------------------------------- -->
          <div class="d-flex flex-column mb-5">
            <v-col
              v-for="(car, index) in pmCar"
              :key="index"
              class="px-2 pt-8 pb-0"
              tile
              flat
            >
              <v-card
                class="d-flex flex-row"
                :color="
                  $vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'
                "
                flat
                tile
                max-height="59px"
              >
                <v-card max-width="100px" color="info" flat>
                  <v-card-title class="text-subtitle-1 pa-0 ma-0 mt-n5">{{
                    car.name
                  }}</v-card-title>
                  <v-card-subtitle class="pa-0 ma-0 text-caption mt-n1"
                    >定員：{{ car.max }} 名</v-card-subtitle
                  >
                  <v-select
                    v-model="pmDriverSchedule[index]"
                    @change="checkDriver"
                    :items="drivers"
                    label="ドライバー"
                    class="pa-0 ma-0 text-caption mt-n1"
                    dense
                    solo
                    flat
                  ></v-select>
                </v-card>
                <v-divider vertical></v-divider>

                <draggable
                  class="d-flex flex-row pa-1"
                  group="pmGroup"
                  @start="drag = true"
                  @end="drag = false"
                  v-model="pmTransferOderLists[index]"
                  :data-column-id="index"
                  style="min-width:100px"
                >
                  <v-card-title
                    class="pa-0 mx-1 text-body-1"
                    v-for="item in pmTransferOderLists[index]"
                    :key="item.id"
                    :data-column-id="index"
                  >
                    {{ item.displayName }} →</v-card-title
                  >
                </draggable>
                <v-sheet
                  color="info"
                  style="heigth: 25px; width: 25px; position: relative"
                  class="ml-2 pt-1"
                  align="center"
                >
                  施設
                </v-sheet>
                <v-btn
                  max-height="24px"
                  max-width="24px"
                  fab
                  x-small
                  color="blue-grey lighten-3"
                  @click="deleteCar(index)"
                  class="noprint ml-1 mt-3"
                  depressed
                >
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-card>
              <v-divider></v-divider>
            </v-col>
          </div>

          <!-- dialog------------------------------------------------------------------ -->
          <v-dialog v-model="dialog" scrollable max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="noprint">
                車両追加
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="noprint">車両選択</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 300px;">
                <v-radio-group
                  v-model="dialogm1"
                  column
                  v-for="(car, i) in carList"
                  :key="i"
                >
                  <v-radio :label="car.name" :value="car.name"></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="addCar">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- dialog------------------------------------------------------------------ -->
        </v-col>

        <v-col cols="2">
          <v-card tile flat class="noprint mb-2">
            <v-list
              class="user pa-0 grey lighten-4 noprint"
              dense
              min-height="50px"
            >
              <v-list-item-title class="text-center orange lighten-4"
                >利用者一覧</v-list-item-title
              >
              <v-list-item-group class="pa-0" color="primary">
                <draggable
                  group="pmGroup"
                  @start="drag = true"
                  @end="drag = false"
                  v-model="todayPmUsers"
                >
                  <v-list-item
                    v-for="todayUser in todayPmUsers"
                    :key="todayUser.id"
                  >
                    <v-list-item-content class="pa-0">
                      <v-list-item-title
                        v-text="todayUser.displayName"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </draggable>
              </v-list-item-group>
            </v-list>
          </v-card>
          <!-- 家族送迎ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー -->
          <v-list class="user pa-0 grey lighten-4" dense min-height="50px">
            <v-list-item-title class="text-center orange lighten-4"
              >家族送迎</v-list-item-title
            >
            <v-list-item-group color="primary" class="pa-0">
              <draggable
                group="pmGroup"
                @start="drag = true"
                @end="drag = false"
                v-model="pmFamilyTransfer"
              >
                <v-list-item
                  v-for="(item, index) in pmFamilyTransfer"
                  :key="index"
                  class="original"
                >
                  <v-list-item-content class="pa-0">
                    <v-list-item-title
                      v-text="item.displayName"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </draggable>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
      <v-row class="justify-center mb-10">
        <v-item-group>
          <v-btn @click="temporarilySaved" class="noprint mr-2">一時保存</v-btn>
          <v-btn @click="saveTodaySchedule" class="noprint ml-2">保存</v-btn>
        </v-item-group>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
moment.updateLocale("ja", {
  weekdays: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日"
  ],
  weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"]
});
import moment from "moment";

import draggable from "vuedraggable";

export default {
  props: ["day"],
  components: { draggable },

  async beforeCreate() {
    const today = this.$route.params.id;
    const day = moment(today).format("ddd");
    this.$store.dispatch("driver/getDriverList");
    this.$store.dispatch("driver/fetchTodayPmDriver", today);
    this.$store.dispatch("car/fetchTodayPmCarList", today);
    this.$store.dispatch("pmSchedule/fetchTodayPmUsers", { day, today });
    this.$store.dispatch("pmSchedule/fetchPmFamilyTransfer", {
      day,
      today
    });

    await this.$store.dispatch(
      "pmSchedule/fetchTodayPmTransferOderLists",
      this.$route.params.id
    );
    const pmTransferOderLists = [
      this.$store.state.pmSchedule.pmTransferOderLists
    ];
    pmTransferOderLists.forEach(data => {
      this.pmTransferOderLists = { ...data };
    });
  },

  data: () => ({
    dialogm1: "",
    dialog: false,
    selectedItem: 1,
    // moveIndex: "",
    moveAmTransferOderList: {},
    pmTransferOderLists: []
  }),

  computed: {
    pmCar() {
      return this.$store.state.car.pmCarList;
    },
    drivers() {
      const drivers = this.$store.getters["driver/fetchDriverList"];
      const driverName = [];
      drivers.forEach(driver => {
        driverName.push(driver.displayName);
      });
      return driverName;
    },

    pmDriverSchedule() {
      const driverSchedule = { ...this.$store.state.driver.pmDriverSchedule };
      const newDriverSchedule = Object.values(driverSchedule);
      return newDriverSchedule;
    },

    todayPmUsers: {
      get() {
        return this.$store.getters["pmSchedule/todayPmUsers"];
      },
      set(value) {
        this.$store.commit("pmSchedule/fetchTodayPmUsers", value);
      }
    },

    pmFamilyTransfer: {
      get() {
        return this.$store.getters["pmSchedule/pmFamilyTransfer"];
      },
      set(value) {
        this.$store.commit("pmSchedule/todayPmFamilyTransfer", value);
      }
    },

    carList() {
      return this.$store.getters["car/fetchCarList"];
    }
  },

  // methods-----------------------------------------------------------------------
  methods: {
    // onAdd(index) {
    //   this.moveIndex = index;
    // },
    saveTodaySchedule() {
      this.$emit("save");
      const day = this.$route.params.id;
      const todayPmTransferOderLists = { ...this.pmTransferOderLists };
      const pmFamilyTransferList = this.pmFamilyTransfer;
      const todayPmUsersList = this.todayPmUsers;
      const todayPmDriver = this.pmDriverSchedule;
      const pmCarList = this.pmCar;

      this.$store.dispatch("pmSchedule/saveTodayPmTransferOderLists", {
        todayPmTransferOderLists,
        day
      });
      this.$store.dispatch("pmSchedule/saveTodayPmFamilyTransfer", {
        pmFamilyTransferList,
        day
      });

      this.$store.dispatch("pmSchedule/saveTodayPmUsers", {
        todayPmUsersList,
        day
      });

      this.$store.dispatch("driver/saveTodayPmDriver", {
        todayPmDriver,
        day
      });

      this.$store.dispatch("car/saveTodayPmCarList", {
        pmCarList,
        day
      });

      this.$store.dispatch("pmSchedule/saveCalendarEvent", day);
    },

    temporarilySaved() {
      this.$emit("save");
      const day = this.$route.params.id;
      const todayPmTransferOderLists = { ...this.pmTransferOderLists };
      const pmFamilyTransferList = this.pmFamilyTransfer;
      const todayPmUsersList = this.todayPmUsers;
      const todayPmDriver = this.pmDriverSchedule;
      const pmCarList = this.pmCar;

      this.$store.dispatch("pmSchedule/saveTodayPmTransferOderLists", {
        todayPmTransferOderLists,
        day
      });
      this.$store.dispatch("pmSchedule/saveTodayPmFamilyTransfer", {
        pmFamilyTransferList,
        day
      });
      this.$store.dispatch("pmSchedule/saveTodayPmUsers", {
        todayPmUsersList,
        day
      });

      this.$store.dispatch("car/saveTodayPmCarList", {
        pmCarList,
        day
      });
      this.$store.dispatch("pmSchedule/temporarilySavedCalendarEvent", day);
      this.$store.dispatch("driver/saveTodayPmDriver", {
        todayPmDriver,
        day
      });
    },

    checkDriver(value) {
      const drivers = [...this.pmDriverSchedule];
      const driver = drivers.filter(driver => driver == value);
      if (driver.length > 1) {
        this.$swal({
          title: "既に選択されてい名前です",
          text: "間違いがないか確認してください",
          icon: "warning",
          dangerMode: true
        });
      }
    },
    deleteCar(i) {
      if (this.pmTransferOderLists[i].length > 0) {
        this.$swal({
          title: "データが存在します",
          text: "元の位置に戻すか、別な車両に動かしてください",
          icon: "warning",
          dangerMode: true
        });
        return;
      }
      const newCarList = [...this.pmCar];
      newCarList.splice(i, 1);
      this.$store.commit("car/addPmCarList", newCarList);
    },

    async fetchTodayPmTransferOderLists() {
      const pmTransferOderLists = [
        this.$store.state.pmSchedule.pmTransferOderLists
      ];
      pmTransferOderLists.forEach(data => {
        this.pmTransferOderLists = { ...data };
      });
    },
    addCar() {
      this.dialog = false;
      let newCarList = [...this.$store.state.car.carList];
      const car = newCarList.filter(car => car.name == this.dialogm1);
      let addCar = "";
      car.forEach(car => (addCar = car));
      this.$store.commit("car/pushPmCarList", addCar);
      const pm = this.pmTransferOderLists;
      const newPm = Object.values(pm);
      newPm.push([]);
      this.pmTransferOderLists = newPm;
    }
  },
  watch: {
    async day() {
      const today = this.day;
      const day = moment(today).format("ddd");

      this.$store.dispatch("pmSchedule/fetchTodayPmUsers", { day, today });
      this.$store.dispatch("pmSchedule/fetchPmFamilyTransfer", {
        day,
        today
      });
      this.$store.dispatch("driver/fetchTodayPmDriver", today);
      this.$store.dispatch("car/fetchTodayPmCarList", today);

      await this.$store.dispatch(
        "pmSchedule/fetchTodayPmTransferOderLists",
        this.$route.params.id
      );
      const pmTransferOderLists = [
        this.$store.state.pmSchedule.pmTransferOderLists
      ];
      pmTransferOderLists.forEach(data => {
        this.pmTransferOderLists = { ...data };
      });
    }
  }
};
</script>

<style>
.user {
  justify-content: center;
}

.v-input__slot {
  padding: 0px !important;
}

.v-list-item {
  min-height: 5px !important;
}
</style>
