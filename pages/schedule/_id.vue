<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-btn outlined small class="ma-4" @click="backToSchedule">
            カレンダーに戻る
          </v-btn>
        </v-col>
        <v-col cols="4">
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
              <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              >
                <template v-slot:append-outer>
                  <v-btn color="primary" @click="reuseData">反映させる</v-btn>
                </template></v-text-field
              >
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-card>
        <v-card-title class="justify-center">
          {{ title }}
        </v-card-title>
      </v-card>
      <v-row>
        <v-col cols="10">
          <v-card>
            迎え
          </v-card>
          <!-- -------------------main---------------------------------------- -->
          <div class="d-flex flex-column">
            <v-col
              v-for="(car, index) in carList"
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
                    :items="drivers"
                    label="ドライバー"
                    class="pa-0 ma-0 text-caption mt-n1"
                    height="5"
                    dense
                    solo
                  ></v-select>
                </v-card>
                <!--<v-card
                  v-for="n in car.max * 2 - 1"
                  :key="n.id"
                  outlined
                  tile
                  min-width="30px"
                  class="pa-0 align-self-center"
                >
                  <v-col
                    cols="3"
                    v-if="n % 2 != 0"
                    class="pa-0"
                    width="58px"
                    :key="car.id"
                  >
                    <draggable
                      class="d-flex flex-row pa-1"
                      group="myGroup"
                      @start="drag = true"
                      @end="
                        drag = false;
                        
                      "
                      :options="options"
                      @add="onAdd(index)"
                      v-model="amTransferOderLists[index]"
                      :data-column-id="index"
                    >
                      <v-list-item
                        class="pa-0"
                        dense
                        v-for="(item, i) in amTransferOderLists[index]"
                        :key="i"
                        :data-column-id="index"
                        >{{ item.displayName }}
                      </v-list-item>
                    </draggable>
                  </v-col>
                  <v-card v-else>
                    <div>
                      →
                    </div>
                  </v-card>
                </v-card> -->
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
                  <!-- <v-btn
                    max-height="24px"
                    max-width="24px"
                    fab
                    dark
                    color="indigo"
                    x-small
                    class="mt-1"
                  >
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn> -->
                </v-sheet>
                <!-- <v-btn
                  max-height="24px"
                  max-width="24px"
                  fab
                  dark
                  x-small
                  color="primary"
                  @click="carDelete"
                >
                  <v-icon dark>
                    mdi-close
                  </v-icon>
                </v-btn> -->
              </v-card>
            </v-col>
          </div>

          <!-- <v-select
            item-text="name"
            :items="carList"
            label="車両追加"
            class="pa-0 ma-0 text-caption"
            height="5"
            dense
            solo
          ></v-select> -->
        </v-col>

        <v-col cols="2">
          <v-card width="150" tile>
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
          </v-card>
        </v-col>
        <v-btn @click="addReverseSchedule">反転挿入</v-btn>
      </v-row>
    </v-container>
    <pmSchedule @save="saveTodaySchedule" />
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
import firebase from "@/plugins/firebase";
import draggable from "vuedraggable";

export default {
  components: { draggable, pmSchedule },

  created() {
    const today = this.$route.params.id;
    const day = moment(today).format("ddd");
    const uid = this.$store.state.login.loginUser.uid;

    this.$store.dispatch("car/getCarList");
    console.log(uid);
    this.$store.dispatch("schedule/fetchAbsenceUser", { today, uid });
  },

  data: () => ({
    options: {
      group: "myGroup",
      animation: 200
    },
    selectedItem: 1,
    moveIndex: "",
    moveAmTransferOderList: {},
    drivers: [],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    uid: this.$store.state.login.loginUser.uid
  }),

  computed: {
    title() {
      return moment(this.$route.params.id).format("M月 DD日 (ddd)");
    },

    carList() {
      return this.$store.getters["car/fetchCarList"];
    },

    todayUsers: {
      get() {
        return this.$store.getters["schedule/todayUsers"];
      },
      set(value) {
        this.$store.commit("schedule/fetchTodayUsers", value);
      }
    },

    amTransferOderLists: {
      get() {
        return { ...this.$store.getters["schedule/amTransferOderLists"] };
      },
      set() {
        // this.$store.commit("schedule/fetchTodayAmTransferOderLists", value);
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
    }
  },
  methods: {
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
    },

    async addReverseSchedule() {
      await this.saveTodaySchedule();
      this.$store.dispatch("pmSchedule/reverseSchedule", this.$route.params.id);
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
