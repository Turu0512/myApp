<template>
  <v-app>
    <v-container>
      <div>
        <v-sheet tile height="6vh" color="grey" class="d-flex align-center">
          <v-btn outlined small class="ma-4" @click="setToday">
            今日
          </v-btn>
          <v-btn icon @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-sheet>
        <v-sheet height="94vh">
          <v-calendar
            ref="calendar"
            v-model="value"
            :events="events"
            :event-color="getEventColor"
            locale="ja-jp"
            :day-format="timestamp => new Date(timestamp.date).getDate()"
            :month-format="
              timestamp => new Date(timestamp.date).getMonth() + 1 + ' /'
            "
            @change="getEvents"
            @click:event="showEvent"
            @click:date="viewDay(value)"
          ></v-calendar>
        </v-sheet>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    events: [],
    value: moment().format("yyyy-MM-DD (ddd)")
  }),
  computed: {
    title() {
      return moment(this.value).format("yyyy年 M月");
    }
  },
  methods: {
    setToday() {
      this.value = moment().format("yyyy-MM-DD");
    },
    showEvent({ event }) {
      alert(`clicked ${event.name}`);
    },
    viewDay(date) {
      console.log(date);
      this.$router.push({ name: "schedule-id", params: { id: date } });
    },
    getEvents() {
      const events = [
        {
          name: "完了",
          start: new Date("2021-10-03T01:00:00"), // 開始時刻
          // end: new Date("2021-11-03T02:00:00"), // 終了時刻
          color: "blue",
          timed: false // 終日ならfalse
        }
      ];
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    }
  }
};
</script>
