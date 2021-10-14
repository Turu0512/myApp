<template>
<v-app>
<v-container>
  <v-btn outlined small class="ma-4" @click="backToSchedule">
        カレンダーに戻る
      </v-btn>
  <v-card>
    <v-card-title class="justify-center">
      {{title}}
    </v-card-title>
  </v-card>
  <v-row>
  <v-col
  cols="10">
  <v-card>
    迎え
  </v-card>
  <!-- -------------------main---------------------------------------- -->
  <div class="d-flex flex-column">
      <v-col
        v-for="car in carList"
        :key="car.id"
        class="pa-2 pt-5"
        outlined
        tile
      >
    <v-card
      class="d-flex flex-row"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      flat
      tile
      max-height="56px"
    >

    <v-card
    max-width="100px">
    <v-card-title 
    class="text-subtitle-1 pa-0 ma-0 mt-n5"
    >{{ car.name }}</v-card-title>
    <v-card-subtitle
    class="pa-0 ma-0 text-caption mt-n1"
    >定員：{{ car.max }} 名</v-card-subtitle>
    <v-select
          :items="items"
          label="ドライバー"
          class="pa-0 ma-0 text-caption mt-n1"
          height="5"
          dense
          solo
          
        ></v-select>
    </v-card>
    
      <v-card
        v-for="n in (car.max*2-1)"
        :key="n.id"
        outlined
        tile
        min-width="30px"
        class="pa-0 align-self-center"
      >
      <v-col
      cols="3"
      v-if="n%2 != 0"
      class="pa-0"
      width="58px"
      :key="car.id"
      >
      <draggable 
          class="d-flex flex-row pa-1" 
          group="myGroup" @start="drag=true" 
          @end="drag=false" :options="options"
          v-model="amTransferOderLists"
          @add="card"
          >
          <v-list-item class="pa-0" dense
          >
          <v-list-item-content v-for="item in amTransferOderLists" :key="item.id">
            <v-list-item-title v-text="item.displayName"></v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        </draggable>
      
      </v-col>
      <v-card v-else>
        <div>
        →
        </div>
      </v-card>
      </v-card>

      <v-sheet color="grey" 
      style="heigth: 25px; width: 25px; position: relative"
      class="ml-2"
      >
      <v-btn
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
    </v-btn>
    
      <v-btn
      max-height="24px"
      max-width="24px"
      fab
      dark
      x-small
      color="primary"
    >
      <v-icon dark>
        mdi-minus
      </v-icon>
    </v-btn>
    
      </v-sheet>


      
    </v-card>
    </v-col>
    </div>
    <v-select
          :items="items"
          label="車両追加"
          class="pa-0 ma-0 text-caption"
          height="5"
          dense
          solo
          
        ></v-select>
   </v-col>


  <v-col
  cols="2">
  <v-card
    width="150"
    tile
  >
    <v-list 
    class="user"
    dense
    >
      <v-subheader>利用者一覧</v-subheader>
      <v-list-item-group
        class="pa-0"
        color="primary"
      >
      <draggable 
      group="myGroup" @start="drag=true" 
      @end="drag=false" :options="options"
      v-model="todayUsers">
        <v-list-item
          v-for="todayUser in todayUsers"
          :key="todayUser.id"
        >
          
          <v-list-item-content class="pa-0">
            <v-list-item-title v-text="todayUser.displayName"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         </draggable>
      </v-list-item-group>
    </v-list>
  </v-card>

  <v-card
    width="150"
    tile
    class="pt-2"
  >
    <v-list 
    class="user"
    dense
    >
      <v-subheader>休み</v-subheader>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list 
    class="user"
    dense
    >
      <v-subheader>家族送迎</v-subheader>
      <v-list-item-group

        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          class="original"
        >
          
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

  </v-col>
　<v-card>
    送り
  <p>{{ amTransferOderList }}</p>
  </v-card>
  </v-row>
  </v-container>
  
  
 </v-app>
</template>

<script>
moment.lang('ja', {
    weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
    weekdaysShort: ["日","月","火","水","木","金","土"],
});
import moment from 'moment';

import draggable from 'vuedraggable'

  export default {
    components: { draggable },

    async created(){
      const day = moment(this.$route.params.id).format('ddd')
      this.$store.dispatch('user/fetchTodayUsers',day)

      await this.$store.dispatch("car/getCarList")
    },

    data: () => ({
      options: {
      group:"myGroup",
      animation: 200},
      selectedItem: 1,
      items: [
        { text: 'Real-Time' },
        { text: 'Audience' },
        { text: 'Conversions' },
      ],
      amTransferOderList:[],
    }),

  computed: {
  title() {
    return moment(this.$route.params.id).format('M月 DD日 (ddd)');
  },

  carList(){
    return this.$store.getters["car/fetchCarList"]
  },

  todayUsers:{
    get() {return this.$store.getters["user/todayUsers"]
    },
    set(value) {
    this.$store.commit("user/fetchTodayUsers",value)
    }
  },

  amTransferOderLists:{
    get() {
    return this.amTransferOderList
      },
    set(value){
      this.amTransferOderList = value
    }
  }
  },


    methods: {
    backToSchedule() {
      this.$router.push({name: "schedule-schedule"});
    },
    card(){
      console.log(this.amTransferOderList)
    }
  },

  onEnd(originalEvent){
    console.log(originalEvent);
  }
  }
</script>

<style>
.user{
 justify-content:center
}

.v-input__slot{
  padding:0px !important;
}

</style>