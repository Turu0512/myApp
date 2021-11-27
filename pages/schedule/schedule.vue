<template>
  <v-app>
    <v-container>
      <div>
        <v-sheet tile height="6vh" color="info" class="d-flex align-center">
          <v-btn small class="ma-4" @click="setToday">
            当日に戻る
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
            locale="ja-jp"
            :day-format="timestamp => new Date(timestamp.date).getDate()"
            :month-format="
              timestamp => new Date(timestamp.date).getMonth() + 1 + ' /'
            "
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
  created() {
    this.$store.dispatch("pmSchedule/fetchCalendarEvent");
  },
  data: () => ({
    value: moment().format("YYYY-MM-DD")
  }),
  computed: {
    title() {
      return moment(this.value).format("YYYY年 MM月");
    },
    events() {
      return this.$store.state.pmSchedule.eventData;
    }
  },
  methods: {
    setToday() {
      this.value = moment().format("YYYY-MM-DD");
      this.$router.push({ name: "schedule-id", params: { id: this.value } });
    },
    showEvent({ event }) {
      alert(`clicked ${event.name}`);
    },
    viewDay(date) {
      this.$router.push({ name: "schedule-id", params: { id: date } });
    }
  }
};
</script>
