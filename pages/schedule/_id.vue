<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn outlined small class="ma-4" @click="backToSchedule">
            カレンダーを表示する
          </v-btn>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                small
                readonly
                v-bind="attrs"
                v-on="on"
                class="noprint ma-4"
                @click="addTodayDate"
                >過去データを呼び出す</v-btn
              >
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
              :events="eventList"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $refs.menu.save(date);
                  reuseData();
                "
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn @click="print" outlined small class="ma-4">印刷</v-btn>
        </v-col>
      </v-row>
      <!----------------------main---------------------------------------- -->

      <v-card color="info">
        <v-card-title class="justify-center">
          <v-btn @click="yesterday" class="noprint mr-12">前日</v-btn>
          {{ title }}
          <v-btn @click="tomorrow" class="noprint ml-12">翌日</v-btn>
        </v-card-title>
      </v-card>
      <v-row>
        <v-col cols="10">
          <h1 class="subtitle-1">
            迎え
          </h1>

          <div class="d-flex flex-column">
            <v-col
              v-for="(car, index) in amCar"
              :key="index"
              class="pa-2 pt-5"
              outlined
              tile
            >
              <v-card
                class="d-flex flex-row"
                :color="
                  $vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'
                "
                flat
                tile
                max-height="56px"
              >
                <v-card max-width="100px">
                  <v-card-title class="text-subtitle-1 pa-0 ma-0 mt-n5">{{
                    car.name
                  }}</v-card-title>
                  <v-card-subtitle class="pa-0 ma-0 text-caption mt-n1"
                    >定員：{{ car.max }} 名</v-card-subtitle
                  >
                  <v-select
                    v-model="driverSchedule[index]"
                    @change="checkDriver"
                    :items="drivers"
                    label="ドライバー"
                    class="pa-0 ma-0 text-caption mt-n1"
                    height="5"
                    dense
                    solo
                  ></v-select>
                </v-card>

                <draggable
                  class="d-flex flex-row pa-1"
                  group="myGroup"
                  @start="drag = true"
                  @end="drag = false"
                  :options="options"
                  @add="onAdd(index)"
                  v-model="amTransferOderLists[index]"
                  :data-column-id="index"
                  style="min-width:100px"
                >
                  <v-card-title
                    class="pa-0 mx-1 text-body-1"
                    v-for="item in amTransferOderLists[index]"
                    :key="item.id"
                    :data-column-id="index"
                  >
                    {{ item.displayName }} →</v-card-title
                  >
                </draggable>
                <v-sheet
                  color="grey"
                  style="heigth: 25px; width: 25px; position: relative"
                  class="ml-2"
                >
                  施設
                </v-sheet>
                <v-btn
                  max-height="24px"
                  max-width="24px"
                  fab
                  dark
                  x-small
                  color="primary"
                  @click="deleteCar(index)"
                  class="noprint"
                >
                  <v-icon dark>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-card>
            </v-col>
          </div>

          <!-- dialog------------------------------------------------------------------ -->
          <v-dialog v-model="dialog" scrollable max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                class="noprint"
              >
                車両追加
              </v-btn>
            </template>
            <v-card class="noprint">
              <v-card-title>車両選択</v-card-title>
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
          <v-card width="150" tile class="noprint">
            <v-list class="user" dense>
              <v-subheader>利用者一覧</v-subheader>
              <v-list-item-group class="pa-0" color="primary">
                <draggable
                  group="myGroup"
                  @start="drag = true"
                  @end="drag = false"
                  :options="options"
                  v-model="todayUsers"
                >
                  <v-list-item
                    v-for="todayUser in todayUsers"
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
          <v-list class="user" dense>
            <v-subheader>家族送迎</v-subheader>
            <v-list-item-group color="primary" class="pa-0">
              <draggable
                group="myGroup"
                @start="drag = true"
                @end="drag = false"
                :options="options"
                v-model="familyTransfer"
              >
                <v-list-item
                  v-for="(item, index) in familyTransfer"
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
          <!-- 休みーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー -->
          <v-card width="150" tile class="pt-2">
            <v-list class="user" dense>
              <v-subheader>休み</v-subheader>
              <v-list-item-group class="pa-0" color="primary">
                <draggable
                  group="myGroup"
                  @start="drag = true"
                  @end="drag = false"
                  :options="options"
                  v-model="absenceUser"
                >
                  <v-list-item
                    v-for="(item, index) in absenceUser"
                    :key="index"
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
          </v-card>
        </v-col>
        <v-btn @click="addReverseSchedule" class="noprint">反転挿入</v-btn>
        <!-- <v-btn @click="check">チェック</v-btn> -->
      </v-row>
    </v-container>

    <pmSchedule @save="saveTodaySchedule" :day="day" ref="pmSchedule" />
  </v-app>
</template>

<script>
moment.lang("ja", {
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
import pmSchedule from "~/components/pmSchedule.vue";
import draggable from "vuedraggable";

export default {
  components: { draggable, pmSchedule },

  async created() {
    const today = this.$route.params.id;
    this.day = today;
    const day = moment(today).format("ddd");
    this.$store.dispatch("car/fetchCarList");
    this.$store.dispatch("car/fetchTodayAmCarList", today);
    this.$store.dispatch("driver/getDriverList");
    this.$store.dispatch("driver/fetchTodayAmDriver", today);
    this.$store.dispatch("schedule/fetchAbsenceUser", today);
    this.$store.dispatch("schedule/fetchTodayUsers", { day, today });
    this.$store.dispatch("schedule/fetchFamilyTransfer", today);
    await this.$store.dispatch("schedule/fetchTodayAmTransferOderLists", today);
    const amTransferOderLists = this.$store.state.schedule.amTransferOderLists;
    amTransferOderLists.forEach(data => {
      this.amTransferOderLists.push(data);
    });
    console.log(this.amTransferOderLists);
    this.$store.dispatch("pmSchedule/fetchCalendarEvent");
  },

  data: () => ({
    options: {
      group: "myGroup",
      animation: 200
    },
    dialogm1: "",
    dialog: false,
    selectedItem: 1,
    moveIndex: "",
    moveAmTransferOderList: {},

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    amTransferOderLists: [],
    day: ""
    // driverSchedule: []
  }),

  computed: {
    title() {
      return moment(this.day).format("M月 DD日 (ddd)");
    },

    amCar() {
      return this.$store.state.car.amCarList;
    },

    todayUsers: {
      get() {
        return this.$store.getters["schedule/todayUsers"];
      },
      set(value) {
        console.log("today" + value);
        this.$store.commit("schedule/fetchTodayUsers", value);
      }
    },

    absenceUser: {
      get() {
        return this.$store.getters["schedule/absenceUser"];
      },
      set(value) {
        // console.log(value);
        this.$store.commit("schedule/todayAbsenceUser", value);
        this.$store.commit("pmSchedule/changeTodayPmUser", value);
      }
    },

    familyTransfer: {
      get() {
        return this.$store.getters["schedule/familyTransfer"];
      },
      set(value) {
        this.$store.commit("schedule/todayFamilyTransfer", value);
      }
    },
    eventList() {
      const event = this.$store.state.pmSchedule.eventData;
      const eventList = [];
      for (let i = 0; i < event.length; i++) {
        eventList.push(event[i].start);
      }
      return eventList;
    },
    drivers() {
      const drivers = this.$store.getters["driver/fetchDriverList"];
      const driverName = [];
      drivers.forEach(driver => {
        driverName.push(driver.displayName);
      });
      return driverName;
    },

    driverSchedule() {
      const driverSchedule = { ...this.$store.state.driver.amDriverSchedule };
      const newDriverSchedule = Object.values(driverSchedule);
      return newDriverSchedule;
    },

    carList() {
      return this.$store.getters["car/fetchCarList"];
    }
  },

  methods: {
    addTodayDate() {
      this.date = this.$route.params.id;
    },

    checkDriver(value) {
      const drivers = [...this.driverSchedule];
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

    async reuseData() {
      const today = this.date;
      const day = moment(today).format("ddd");
      console.log(day);
      const newToday = this.$route.params.id;
      const newDay = moment(newToday).format("ddd");
      console.log(newDay);

      if (day != newDay) {
        this.$swal({
          title: "同じ曜日を選択してください"
        });
        return;
      }

      this.$store.dispatch("schedule/fetch", { today, day });
    },
    backToSchedule() {
      this.$router.push({ name: "schedule-schedule" });
    },
    onAdd(index) {
      // console.log(index)
      this.moveIndex = index;
      // this.amTransferOderList.push(amTransferOderList[index])
    },

    saveTodaySchedule() {
      const day = this.$route.params.id;
      const todayAmTransferOderLists = { ...this.amTransferOderLists };
      const familyTransferList = this.familyTransfer;
      const absenceUserList = this.absenceUser;
      const todayUsersList = this.todayUsers;
      const todayAmDriver = this.driverSchedule;
      const amCarList = this.amCar;

      this.$store.dispatch("schedule/saveTodayAmTransferOderLists", {
        todayAmTransferOderLists,
        day
      });
      this.$store.dispatch("schedule/saveTodayFamilyTransfer", {
        familyTransferList,
        day
      });
      this.$store.dispatch("schedule/saveTodayAbsenceUser", {
        absenceUserList,
        day
      });
      this.$store.dispatch("schedule/saveTodayUsers", {
        todayUsersList,
        day
      });
      this.$store.dispatch("driver/saveTodayAmDriver", {
        todayAmDriver,
        day
      });
      this.$store.dispatch("car/saveTodayAmCarList", {
        amCarList,
        day
      });
    },

    async addReverseSchedule() {
      await this.saveTodaySchedule();
      await this.$store.dispatch(
        "pmSchedule/reverseSchedule",
        this.$route.params.id
      );
      this.$store.dispatch("driver/copyAmDriver", this.$route.params.id);
      this.$refs.pmSchedule.fetchTodayPmTransferOderLists();
      this.$store.commit("car/addPmCarList", this.amCar);
    },

    tomorrow() {
      const dayData = this.day;
      const day = moment(dayData) + 86400000;
      const day2 = moment(day).format("yyyy-MM-DD");
      this.day = day2;
    },
    yesterday() {
      const dayData = this.day;
      const day = moment(dayData) - 86400000;
      const day2 = moment(day).format("yyyy-MM-DD");
      this.day = day2;
    },

    deleteCar(i) {
      if (this.amTransferOderLists[i].length > 0) {
        this.$swal({
          title: "データが存在します",
          text: "元の位置に戻すか、別な車両に動かしてください",
          icon: "warning",
          dangerMode: true
        });
        return;
      }
      const newCarList = [...this.amCar];
      newCarList.splice(i, 1);
      this.$store.commit("car/addAmCarList", newCarList);
    },

    addCar() {
      this.dialog = false;
      let newCarList = [...this.$store.state.car.carList];
      const car = newCarList.filter(car => car.name == this.dialogm1);
      let addCar = "";
      car.forEach(car => (addCar = car));
      // newCarList.push(addCar);
      this.$store.commit("car/pushAmCarList", addCar);
      // this.$store.dispatch("schedule/addAmNewList");
      const am = this.amTransferOderLists;
      const newAm = Object.values(am);
      newAm.push([]);
      this.amTransferOderLists = newAm;
      console.log(newAm);
    },

    async print() {
      await this.$emit("drawer");
      window.print();
    }
  },

  watch: {
    async day() {
      this.$route.params.id = this.day;
      // console.log(this.$route.params.id);
      this.$router.push({
        name: "schedule-id",
        params: { id: this.$route.params.id }
      });
      const today = this.day;
      console.log(today);
      const day = moment(today).format("ddd");
      // this.$store.dispatch("car/getCarList");
      this.$store.dispatch("car/fetchTodayAmCarList", today);

      this.$store.dispatch("schedule/fetchAbsenceUser", today);
      this.$store.dispatch("schedule/fetchTodayUsers", { day, today });
      this.$store.dispatch("schedule/fetchFamilyTransfer", today);
      this.$store.dispatch("driver/fetchTodayAmDriver", today);

      await this.$store.dispatch(
        "schedule/fetchTodayAmTransferOderLists",
        today
      );
      const amTransferOderLists = [
        this.$store.state.schedule.amTransferOderLists
      ];
      // console.log(amTransferOderLists);
      amTransferOderLists.forEach(data => {
        this.amTransferOderLists = { ...data };
      });
      this.$store.dispatch("pmSchedule/fetchCalendarEvent");
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
@media print {
  .noprint {
    display: none;
  }
}
</style>
