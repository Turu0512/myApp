<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="10">
          <v-card>
            送り
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
                      group="pmGroup"
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
                  group="pmGroup"
                  @start="drag = true"
                  @end="drag = false"
                  :options="options"
                  @add="onAdd(index)"
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
                  group="pmGroup"
                  @start="drag = true"
                  @end="drag = false"
                  :options="options"
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
          <!-- 休みーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー -->
          <!-- <v-card width="150" tile class="pt-2">
            <v-list class="user" dense>
              <v-subheader>休み</v-subheader>
              <v-list-item-group class="pa-0" color="primary">
                <draggable
                  group="pmGroup"
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
            </v-list> -->
            <!-- 家族送迎ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー -->
            <v-list class="user" dense>
              <v-subheader>家族送迎</v-subheader>
              <v-list-item-group color="primary" class="pa-0">
                <draggable
                  group="pmGroup"
                  @start="drag = true"
                  @end="drag = false"
                  :options="options"
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
          </v-card>
        </v-col>
        <v-btn @click="temporarilySaved">一時保存</v-btn>
        <v-btn @click="saveTodaySchedule">保存</v-btn>
      </v-row>
    </v-container>
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

import draggable from "vuedraggable";

export default {
  props:["day"],
  components: { draggable },

  async beforeCreate() {
    const today = this.$route.params.id;
    const day = moment(today).format("ddd");

    this.$store.dispatch("pmSchedule/fetchTodayPmUsers", { day, today });
    // this.$store.dispatch("schedule/fetchAbsenceUser", this.$route.params.id);
    this.$store.dispatch("pmSchedule/fetchPmFamilyTransfer", {
      day,
      today
    });

    this.$store.dispatch("car/getCarList");
    await this.$store.dispatch(
      "pmSchedule/fetchTodayPmTransferOderLists",
      this.$route.params.id
    );
    const pmTransferOderLists = [
      this.$store.state.pmSchedule.pmTransferOderLists
    ];
    console.log(pmTransferOderLists);
    pmTransferOderLists.forEach(data => {
      this.pmTransferOderLists = { ...data };
    });
  },

  data: () => ({
    options: {
      group: "pmGroup",
      animation: 200
    },
    selectedItem: 1,
    moveIndex: "",
    moveAmTransferOderList: {},
    drivers: [],
    pmTransferOderLists: [],
  }),

  computed: {
    carList() {
      return this.$store.getters["car/fetchCarList"];
    },

    todayPmUsers: {
      get() {
        return this.$store.getters["pmSchedule/todayPmUsers"];
      },
      set(value) {
        this.$store.commit("pmSchedule/fetchTodayPmUsers", value);
      }
    },

    // absenceUser: {
    //   get() {
    //     return this.$store.getters["schedule/absenceUser"];
    //   },
    //   set(value) {
    //     // console.log(value);
    //     this.$store.commit("schedule/todayAbsenceUser", value);
    //   }
    // },

    pmFamilyTransfer: {
      get() {
        return this.$store.getters["pmSchedule/pmFamilyTransfer"];
      },
      set(value) {
        this.$store.commit("pmSchedule/todayPmFamilyTransfer", value);
      }
    }
  },
  //
  methods: {
    onAdd(index) {
      this.moveIndex = index;
    },
    saveTodaySchedule() {
      this.$emit("save");
      const day = this.$route.params.id;
      const todayPmTransferOderLists = { ...this.pmTransferOderLists };
      const pmFamilyTransferList = this.pmFamilyTransfer;
      // const absenceUserList = this.absenceUser;
      const todayPmUsersList = this.todayPmUsers;

      this.$store.dispatch("pmSchedule/saveTodayPmTransferOderLists", {
        todayPmTransferOderLists,
        day
      });
      this.$store.dispatch("pmSchedule/saveTodayPmFamilyTransfer", {
        pmFamilyTransferList,
        day
      });
      // this.$store.dispatch("schedule/saveTodayAbsenceUser", {
      //   absenceUserList,
      //   day
      // });
      this.$store.dispatch("pmSchedule/saveTodayPmUsers", {
        todayPmUsersList,
        day
      });

      this.$store.dispatch("pmSchedule/saveCalendarEvent", day);
    },
    temporarilySaved() {
      this.$emit("save");
      const day = this.$route.params.id;
      const todayPmTransferOderLists = { ...this.pmTransferOderLists };
      const pmFamilyTransferList = this.pmFamilyTransfer;
      // const absenceUserList = this.absenceUser;
      const todayPmUsersList = this.todayPmUsers;

      this.$store.dispatch("pmSchedule/saveTodayPmTransferOderLists", {
        todayPmTransferOderLists,
        day
      });
      this.$store.dispatch("pmSchedule/saveTodayPmFamilyTransfer", {
        pmFamilyTransferList,
        day
      });
      // this.$store.dispatch("schedule/saveTodayAbsenceUser", {
      //   absenceUserList,
      //   day
      // });
      this.$store.dispatch("pmSchedule/saveTodayPmUsers", {
        todayPmUsersList,
        day
      });

      this.$store.dispatch("pmSchedule/temporarilySavedCalendarEvent", day);
    }
  },
  watch:{
    async day(){
      const today = this.$route.params.id;
    const day = moment(today).format("ddd");

    this.$store.dispatch("pmSchedule/fetchTodayPmUsers", { day, today });
    // this.$store.dispatch("schedule/fetchAbsenceUser", this.$route.params.id);
    this.$store.dispatch("pmSchedule/fetchPmFamilyTransfer", {
      day,
      today
    });

    this.$store.dispatch("car/getCarList");
    await this.$store.dispatch(
      "pmSchedule/fetchTodayPmTransferOderLists",
      this.$route.params.id
    );
    const pmTransferOderLists = [
      this.$store.state.pmSchedule.pmTransferOderLists
    ];
    console.log(pmTransferOderLists);
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
